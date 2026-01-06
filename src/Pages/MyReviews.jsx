import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import ReviewCard from "../Components/ReviewCard";
import { Spinner } from "../Components/Spinner";

export function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const { userData, loading } = useUser();

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
  }, [userData, reviews, loading]);

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
        {reviews ? (
          reviews.map((review) => {
            return <ReviewCard key={review.animeId} review={review} />;
          })
        ) : (
          <h1 className="text-3xl text-center text-white">
            You haven't made any reviews yet. Once you do you'll see it here!
          </h1>
        )}
      </ol>
    </div>
  );
}
