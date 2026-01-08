import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import ReviewCard from "../Components/ReviewCard";
import { Spinner } from "../Components/Spinner";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../config/firestore";
import { useNavigate } from "react-router-dom";

export function MyReviews() {
  const [reviews, setReviews] = useState({});
  const { user, userData, loading } = useUser();
  const navigate = useNavigate();

  const handleUpdateReview = async (e, animeId) => {
    e.preventDefault();

    // re-route back to the review page, with current anime info
    // TODO: I'm not sure if this is optimized. Since we are creating an
    // entierly new review and not updateing the specific attribte
    navigate("/review", { state: reviews[animeId] });
  };
  const handleDeleteReview = async (e, animeId) => {
    e.preventDefault();
    setReviews((prev) => {
      const updated = { ...prev };
      delete updated[animeId];
      return updated;
    });

    const userRef = doc(db, "Users", user.email);

    await updateDoc(userRef, {
      [`reviews.${animeId}`]: deleteField(),
    });
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        if (!loading) {
          setReviews(await userData["reviews"]);
        }
      } catch (error) {
        console.log("Error retrieving reviews: ", error);
      }
    };
    getReviews();
  }, [userData, loading]);

  // prevents the user from seeing default values
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loadingText="Loading reviews..." />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-700 py-20">
      <h1 className="text-5xl mb-10 text-white">My Reviews</h1>
      <ol className="max-w-[800px] space-y-6">
        {reviews && Object.keys(reviews).length > 0 ? (
          Object.entries(reviews).map(([animeId, review]) => (
            <ReviewCard
              key={animeId}
              review={review}
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
