import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
export default function FriendCard({
  request,
  friendUID,
  handleAccept,
  handleReject,
}) {
  const [friendData, setFriendData] = useState([]);
  const [loading, setIsLoading] = useState("false");

  let requesterUID = "";
  let id = "";

  if (request) {
    requesterUID = request.requesterUID;
    id = request.id;
  }

  // using the requesterUID we can get all info related to the other user and display it
  // if this is not a request, use friendUID
  // otherwise use requesterUID
  useEffect(() => {
    const fetchFriendData = async () => {
      setIsLoading(true);
      try {
        const friendRef = doc(db, "Users", friendUID || requesterUID);
        const friendSnap = await getDoc(friendRef);

        if (friendSnap.exists()) {
          setFriendData(friendSnap.data());
        } else {
          throw new Error("This user does not exist");
        }
      } catch (error) {
        console.log("Error Fetching Friend Data: " + error);
      }
      setIsLoading(false);
    };
    fetchFriendData();
  }, [friendUID, requesterUID]);

  return (
    <>
      {!loading ? (
        <li className="bg-yellow-600 rounded-xl p-4 flex items-center justify-between shadow">
          {/* Left: Avatar + Name + Status */}
          <div className="flex items-center gap-4">
            <img
              className="w-[70px] h-[90px] object-cover rounded-lg"
              src={friendData.profilePicture}
              alt="Pending friend"
            />

            <div className="flex flex-col">
              <p className="text-xl text-white font-semibold">
                {friendData.username}
              </p>

              {/* Status */}
              {/* <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  status ? "bg-green-400" : "bg-gray-400"
                }`}
              />
              <span className="text-sm text-white/80">
                {status ? "Online" : "Offline"}
              </span> */}
              {/* Use bg-gray-400 + "Offline" when offline */}
              {/* </div> */}
            </div>
          </div>

          {/* If this is a pending request, show options */}
          {request?.status === "pending" ? (
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(request)}
                className="px-4 hover:cursor-pointer py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
              >
                Accept
              </button>

              <button
                onClick={() => handleReject(id)}
                className="px-4 py-2 hover:cursor-pointer rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          ) : (
            ""
          )}
        </li>
      ) : (
        <Spinner></Spinner>
      )}
    </>
  );
}
