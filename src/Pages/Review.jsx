import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router";

export function Review() {
  const [userReview, setUserReview] = useState("");
  const { user } = useUser();
  const location = useLocation();
  let navigate = useNavigate();
  const {
    anime = {
      title: { english: "null", romaji: "null" },
      coverImage: {
        extraLarge:
          "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg",
      },
      id: null,
    },
  } = location.state || {};

  const titleEng = anime.title.english;
  const titleRomaji = anime.title.romaji;
  const coverImg = anime.coverImage.extraLarge;
  const displayTitle = titleEng || titleRomaji;
  const animeId = anime.id;

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      // TODO start using UUID
      const userRef = doc(db, "Users", user.email);
      // NOTE: I was confused as to why I needed brackets around the
      // review when I assumed the template literals (backticks) would
      // work however this is invalid JS syntax. Using brackets tells the
      // computer to evaluate the  template literals
      await updateDoc(userRef, {
        [`reviews.${animeId}`]: {
          title: displayTitle,
          review: userReview,
          coverImg,
          animeId,
        },
      });
      // TODO, potentially show a modal popup with sucess message for
      // user to see that a review was made
      console.log("added review");
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-700 p-6">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center mb-12">
        <img
          className="rounded-xl shadow-lg w-[250px] md:w-[300px]"
          src={coverImg}
          alt={`${displayTitle} poster`}
        />
        <h1 className="text-5xl mt-6 font-bold tracking-wide text-white">
          {displayTitle}
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
          id="review-input"
          className="w-full min-h-[200px] p-4 rounded-xl bg-pink-500 text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-pink-300 resize-none"
          placeholder="Write something..."
        ></textarea>

        <div className="flex flex-row gap-6">
          <button
            type="submit"
            className="button w-[50%] py-3 bg-white text-pink-700 font-bold rounded-xl shadow-md hover:bg-white/50 hover:cursor-pointer transition"
          >
            Submit
          </button>
          <Link
            to="/Search"
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
