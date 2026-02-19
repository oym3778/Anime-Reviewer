import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FriendsContext } from "../contexts/FriendsContext";
import { Spinner } from "../components/Spinner";
import {
  doc,
  writeBatch,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../config/firestore";
import { useNavigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import { toast } from "react-toastify";
import { logError } from "../utilities/errorLogger";
export function MyReviews() {
  const [reviews, setReviews] = useState({});
  const { user, loading } = useContext(AuthContext);
  const friends = useContext(FriendsContext);
  const navigate = useNavigate();
  const [sharedReviews, setSharedReviews] = useState({});

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

    try {
      const batch = writeBatch(db);

      const animeReviewsRef = doc(
        db,
        "AnimeReviews",
        String(animeId),
        "users",
        user.uid,
      );
      const userRef = doc(db, "Users", user.uid, "reviews", String(animeId));

      batch.delete(userRef);
      batch.delete(animeReviewsRef);
      await batch.commit().catch((e) => {
        const { error, uiMessage } = logError(e);
        toast.error(uiMessage.message);
        throw error;
      });
      toast.success("Deleted Review!");
    } catch (error) {
      console.log("Error Deleting Review: ", error);
    }
  };

  // Firestore allows max 30 values to be filtered through within an array, so we'll chunk them
  function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Create listeners for each anime's shared reviews,
  // if a friend removes or adds a new review we auto update
  // and firebase does all the work B) and im only billed on reads returned
  useEffect(() => {
    if (!reviews.length || !friends.size) return;

    const friendChunks = chunkArray([...friends], 30);
    const unsubscribes = [];

    // Temporary store: animeId -> chunkIndex -> friendIds
    /*
      animeId : {
        chunkIndex : [friendId, friendId]
        chunkIndex : [friendId]
      }

      using flat() combines these chunks so we always compute merging on a single total
    */
    const chunkResults = {};

    reviews.forEach((review) => {
      const animeId = String(review.anime.id);
      chunkResults[animeId] = {};

      friendChunks.forEach((chunk, chunkIndex) => {
        const q = query(
          collection(db, "AnimeReviews", animeId, "users"),
          where(documentId(), "in", chunk),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const friendIds = snapshot.docs.map((doc) => doc.id);

          chunkResults[animeId][chunkIndex] = friendIds;

          // Recompute merged result from ALL chunks
          const merged = Object.values(chunkResults[animeId]).flat();

          setSharedReviews((prev) => {
            const updated = { ...prev };

            if (merged.length > 0) {
              updated[animeId] = merged;
            } else {
              delete updated[animeId];
            }

            return updated;
          });
        });

        unsubscribes.push(unsubscribe);
      });
    });

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [friends, reviews]);

  // Retrieve reviews, using snapshot
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
                friendReviewCount={sharedReviews[curReview.anime.id] ?? 0}
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
