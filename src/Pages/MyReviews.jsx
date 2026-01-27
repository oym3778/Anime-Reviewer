import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Spinner } from "../components/Spinner";
import { doc, updateDoc, deleteField, onSnapshot } from "firebase/firestore";
import { db } from "../config/firestore";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

export function MyReviews() {
  const [reviews, setReviews] = useState({});
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const handleUpdateReview = async (e, animeId) => {
    e.preventDefault();

    // re-route back to the review page, with current anime info
    // Similar to /AnimeCard except /AnimeCard navigates to the /review page sending just an anime,
    // but /review should always expect a review and an anime regardless
    navigate("/review", {
      state: { anime: reviews[animeId].anime, review: reviews[animeId].review },
    });
  };
  const handleDeleteReview = async (e, animeId) => {
    e.preventDefault();
    setReviews((prev) => {
      const updated = { ...prev };
      delete updated[animeId];
      return updated;
    });

    const userRef = doc(db, "Users", user.uid);

    await updateDoc(userRef, {
      [`reviews.${animeId}`]: deleteField(),
    });
  };

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = onSnapshot(doc(db, "Users", user.uid), (snapshot) => {
      setReviews(snapshot.data()["reviews"]);
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
        {reviews && Object.keys(reviews).length > 0 ? (
          // [animeId = Key, review = Value]
          Object.entries(reviews).map(([animeId, curReview]) => (
            <ReviewCard
              key={animeId}
              anime={curReview.anime}
              review={curReview.review}
              handleUpdate={(e) => {
                return handleUpdateReview(e, animeId);
              }}
              handleDelete={(e) => handleDeleteReview(e, animeId)}
            />
          ))
        ) : (
          <h1 className="text-3xl text-center text-white">
            You haven't made any reviews yet. Once you do you'll see it here!
          </h1>
        )}
      </ol>
    </div>
  );
}
