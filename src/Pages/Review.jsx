import { useLocation, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { logError } from "../utilities/errorLogger";
import Anime from "../utilities/Anime";
import animeConverter from "../utilities/animeConverter";
import { toast } from "react-toastify";

// TODO Add a spinner for loading reviews, may need to create custom loading component. eh just use loading variable
export function Review() {
  // SHOULD RETURN A ANIME AND REVIEW OBJECT { anime, review }
  const location = useLocation();

  // location.state will return either just an
  // anime -> /AnimeCard
  // anime with a review -> /MyReviews
  const { anime, review } = location.state ?? { anime: {}, review: {} };
  const currentAnime = new Anime(anime);
  const [userReview, setUserReview] = useState(review.openEnded || "");

  const { user, userData } = useContext(AuthContext);

  let navigate = useNavigate();
  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      // TODO prevents the additional write if nothing changed
      // Will need to optimize when reviews are grown out
      if (userReview === review.openEnded) {
        navigate("/myreviews");
        const { error, uiMessage } = logError("No changes were made");
        toast.warn(uiMessage);
        throw error;
      }
      const batch = writeBatch(db);

      // NOTE - terrible error logged here (TypeError: n.indexOf is not a function) means you have an invalid doc reference.
      // YOU MUST USE STRINGS WHEN CREATING A REFERENCE, wish it said that....
      const userRef = doc(
        db,
        "Users",
        user.uid,
        "reviews",
        String(currentAnime.animeId),
      );
      // TODO Look into incrementing a count for totalReviews within animeId
      const animeReviewsRef = doc(
        db,
        "AnimeReviews",
        String(currentAnime.animeId),
        "users",
        user.uid,
      );

      batch.set(animeReviewsRef, {
        uid: user.uid,
        username: userData.username,
        addedAt: serverTimestamp(),
      });

      // NOTE: I was confused as to why I needed brackets around the
      // review when I assumed the template literals (backticks) would
      // work however this is invalid JS syntax. Using brackets tells the
      // computer to evaluate the template literals
      batch.set(userRef, {
        anime: animeConverter.toFirestore(currentAnime),
        review: {
          openEnded: userReview,
        },
      });

      await batch.commit().catch((e) => {
        const { error, uiMessage } = logError(e);
        toast.error(uiMessage.message);
        throw error;
      });

      navigate("/myreviews");
      toast.success("Added Review!");
    } catch (error) {
      console.log("Error Adding/Updating Review " + error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-700 p-6">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center mb-12">
        <img
          className="rounded-xl shadow-lg w-[250px] md:w-[300px]"
          src={currentAnime.largeCoverImg}
          alt={`${currentAnime.displayTitle} poster`}
        />
        <h1 className="text-5xl mt-6 font-bold tracking-wide text-white">
          {currentAnime.displayTitle}
        </h1>
      </div>

      {/* Review Form */}
      <form
        onSubmit={handleAddReview}
        className="max-w-[800px] w-full flex flex-col gap-6"
      >
        <label htmlFor="review-input" className="text-3xl text-white">
          Leave Your Review
        </label>

        <textarea
          required
          onChange={(e) => {
            setUserReview(e.target.value);
          }}
          value={userReview}
          id="review-input"
          className="w-full min-h-[200px] p-4 rounded-xl bg-pink-500 text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-pink-300 resize-none"
          placeholder="Write something..."
        ></textarea>

        <div className="flex flex-row gap-6 justify-center">
          {currentAnime.animeId !== null && (
            <button
              type="submit"
              className="button w-[50%] py-3 bg-white text-pink-700 font-bold rounded-xl shadow-md hover:bg-white/50 hover:cursor-pointer transition"
            >
              Submit
            </button>
          )}
          <Link
            to={-1}
            disabled
            className="text-center button w-[50%] py-3 bg-white text-pink-700 font-bold rounded-xl shadow-md hover:bg-white/50 hover:cursor-pointer transition"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
