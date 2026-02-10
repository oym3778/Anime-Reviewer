import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Spinner } from "../components/Spinner";
import {
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../config/firestore";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { toast } from "react-toastify";

export function MyReviews() {
  const [reviews, setReviews] = useState({});
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const handleUpdateReview = async (e, animeId) => {
    e.preventDefault();

    // re-route back to the review page, with current anime info
    // Similar to /AnimeCard except /AnimeCard navigates to the /review page sending just an anime,
    // but /review should always expect a review and an anime regardless
    try {
      const docRef = doc(db, "Users", user.uid, "reviews", String(animeId));
      const docSnap = await getDoc(docRef);

      // Remmeber data() for the snap is an object holding anime and review
      // which is why this works
      navigate("/review", {
        state: docSnap.data(),
      });
    } catch (error) {
      console.log("Error Updating Review: " + error);
      toast.error("That anime does not exist");
    }
  };
  const handleDeleteReview = async (e, animeId) => {
    e.preventDefault();

    const userRef = doc(db, "Users", user.uid, "reviews", String(animeId));
    await deleteDoc(userRef).then(toast.success("Deleted Review"));
  };

  useEffect(() => {
    if (!user?.uid) return;

    const reviewsRef = collection(db, "Users", user.uid, "reviews");

    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      setReviews(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, [user?.uid]);

  // prevents the user from seeing default values
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loadingText="Loading Reviews..." />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-700 py-20">
      <h1 className="text-5xl mb-10 text-white">My Reviews</h1>
      <ol className="max-w-[800px] space-y-6">
        {reviews && reviews.length > 0 ? (
          reviews.map((curReview) => {
            return (
              <ReviewCard
                key={curReview.anime.id}
                anime={curReview.anime}
                review={curReview.review}
                handleUpdate={(e) => {
                  return handleUpdateReview(e, curReview.anime.id);
                }}
                handleDelete={(e) => handleDeleteReview(e, curReview.anime.id)}
              />
            );
          })
        ) : (
          <h1 className="text-3xl text-center text-white">
            You haven't made any reviews yet. Once you do you'll see them here!
          </h1>
        )}
      </ol>
    </div>
  );
}
