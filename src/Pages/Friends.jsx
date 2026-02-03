import FriendCard from "../components/FriendCard";
import { useUser } from "../hooks/useUser";
import { useState, useEffect } from "react";
import {
  doc,
  runTransaction,
  serverTimestamp,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

import { db } from "../config/firestore";
import { logError, showToast } from "../utilities/errorLogger";
import { toast } from "react-toastify";

export function Friends() {
  const { user } = useUser();
  const [responderUsername, setResponderUsername] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  // When the logged-in user changes, attach a realtime listener
  // to that user's pending friend requests
  useEffect(() => {
    if (!user?.uid) return;

    // Query pending friend requests where the current user is the responder
    const q = query(
      collection(db, "FriendRequests"),
      where("responderUID", "==", user.uid),
      where("status", "==", "pending"),
    );

    // Attach a realtime Firestore listener:
    // - runs immediately with current data
    // - re-runs whenever matching documents change
    // onSnapshot returns a function that cancels the Firestore listener.
    // React's cleanup phase is where we call that cancellation function.
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const requests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFriendRequests(requests);

        // NOTE: I wanted to figure out how many reads these snapshot listeners cost me and found that
        // firestore does a great job of caching the data for you, even if youu decide
        // to go to another tab, i.e profile page and come back, as long as the
        // data for that snapshot hasnt changed, it'll cost no adiitonal read
        // using includeMetadataChanges: true allows you to receive more granular information
        // if (snapshot.metadata.fromCache) {
        //   console.log("Data came from local cache (maybe stale)");
        // } else {
        //   console.log("Data came from the server (fresh)");
        // }
      },
    );
    // on unmount firebase will automaticlally stop listening for use and remove listener
    return () => unsubscribe();

    // user?.uid is a dependency not because Firestore updates,
    // but because the active user's identity determines
    // which realtime listener should exist
  }, [user?.uid]);

  // Check to see if the user has friends, set friends
  useEffect(() => {
    if (!user?.uid) return;

    const friendsRef = collection(db, "Users", user.uid, "friends");

    const unsubscribe = onSnapshot(friendsRef, (snapshot) => {
      setFriends(snapshot.docs.map((doc) => doc.id));
    });

    return unsubscribe;
  }, [user?.uid]);

  const handleSendFriendRequest = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Trying to send request...");
    try {
      await runTransaction(db, async (transaction) => {
        // Send a request IF responder username exist
        const responderRef = doc(db, "Usernames", responderUsername);
        const responderSnap = await transaction.get(responderRef);

        if (!responderSnap.exists()) {
          const { error, uiMessage } = logError(
            `The Username: "${responderUsername}" does not exist`,
            { username: responderUsername },
            `Responder not found. username=${responderUsername}`,
          );
          showToast(toastId, uiMessage);
          throw error;
        }

        const responderUID = responderSnap.data()["uid"];
        const requesterUID = user.uid;

        if (friends.includes(responderUID)) {
          const { error, uiMessage } = logError(
            `${responderUsername} is already your friend`,
            { responderUID: responderUID },
          );
          showToast(toastId, uiMessage);
          throw error;
        }

        if (requesterUID === responderUID) {
          const { error, uiMessage } = logError(`You can not friend yourself`);
          showToast(toastId, uiMessage);
          throw error;
        }

        // Canonical ordering so users dont send eachother friend requests while a request is already pending,
        // one user will need to be the deciding factor
        // Firebase UID length ≈ 28 characters, this is not a case worth optemizing since the string length is so small
        // even if the search is O(n), insignificant
        let compositeId;
        if (requesterUID < responderUID) {
          compositeId = `${requesterUID}_${responderUID}`;
        } else {
          compositeId = `${responderUID}_${requesterUID}`;
        }

        const friendRequestsRef = doc(db, "FriendRequests", compositeId);
        const friendRequestsSnap = await transaction.get(friendRequestsRef);
        // check if the friend request already exists
        if (friendRequestsSnap.exists()) {
          // IF someone sent me the request, I need to make a decision
          if (friendRequestsSnap.data()["responderUID"] === requesterUID) {
            const { error, uiMessage } = logError(
              `Please select an option for: ${responderUsername}`,
            );
            showToast(toastId, uiMessage);
            throw error;
          } else {
            // Else I need to wait
            const { error, uiMessage } = logError(
              `You have a pending request to: ${responderUsername}`,
            );
            showToast(toastId, uiMessage);
            throw error;
          }
        }

        transaction.set(friendRequestsRef, {
          requesterUID: user.uid,
          responderUID: responderUID,
          status: "pending",
          createdAt: serverTimestamp(),
        });
      });

      showToast(
        toastId,
        `Sent Friend Request to: ${responderUsername}`,
        "success",
      );
    } catch (error) {
      console.log("Friend Request Failed ", error);
    }
  };
  const handleAcceptFriendRequest = async (request) => {
    const { requesterUID, responderUID, id } = request;

    // Useing a batch write instead of Promise.all:
    // - Promise.all can result in partial success if one write fails
    // - Batch writes are atomic (all succeed or all fail)
    // - No reads or retry logic needed, unlike transactions
    const batch = writeBatch(db);

    batch.set(doc(db, "Users", requesterUID, "friends", responderUID), {
      addedAt: serverTimestamp(),
    });
    batch.set(doc(db, "Users", responderUID, "friends", requesterUID), {
      addedAt: serverTimestamp(),
    });

    batch.delete(doc(db, "FriendRequests", id));
    await batch.commit().then(toast.success("Accepted!"));
  };
  const handleRejectFriendRequest = async (requestId) => {
    await deleteDoc(doc(db, "FriendRequests", requestId)).then(
      toast.success("Rejected!"),
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-16 bg-yellow-700 p-8">
      {/* Add Friend Form */}
      <form
        onSubmit={(e) => handleSendFriendRequest(e)}
        className="bg-yellow-500 p-6 rounded-xl shadow-lg w-full max-w-[500px] flex flex-col gap-4"
      >
        <label
          htmlFor="friend-username"
          className="font-bold text-xl text-yellow-900"
        >
          Username
        </label>

        <input
          onChange={(e) => {
            setResponderUsername(e.target.value);
          }}
          required
          type="text"
          id="friend-username"
          className="p-3 rounded-lg bg-yellow-200 text-yellow-900 outline-none focus:ring-4 focus:ring-yellow-300"
          placeholder="Enter username..."
        />

        <button
          type="submit"
          className="mt-2 bg-white text-yellow-700 font-bold py-3 rounded-xl shadow-md hover:bg-white/70 hover:cursor-pointer transition"
        >
          Send Request
        </button>
      </form>

      {/* Pending Requests */}
      <div id="pending-request" className="w-full max-w-[600px]">
        <h2 className="text-3xl font-bold text-white mb-4">Pending Requests</h2>

        <ul className="bg-yellow-500 p-4 rounded-xl shadow-lg flex flex-col gap-4">
          {friendRequests.length <= 0 ? (
            <h1 className="text-center">No pending requests</h1>
          ) : (
            friendRequests.map((request) => {
              return (
                <FriendCard
                  key={request.id}
                  request={request}
                  handleAccept={handleAcceptFriendRequest}
                  handleReject={handleRejectFriendRequest}
                ></FriendCard>
              );
            })
          )}
        </ul>
      </div>

      {/* Friends List */}
      <div id="friends-list" className="w-full max-w-[600px]">
        <h2 className="text-3xl font-bold text-white mb-4">Friends</h2>
        <ul className="bg-yellow-500 p-4 rounded-xl shadow-lg flex flex-col gap-4">
          {friends.length > 0 ? (
            friends.map((friendUID) => {
              return (
                <FriendCard
                  key={friendUID}
                  friendUID={friendUID}
                  handleAccept={handleAcceptFriendRequest}
                  handleReject={handleRejectFriendRequest}
                ></FriendCard>
              );
            })
          ) : (
            <h1 className="text-center">No Friends ;-;</h1>
          )}
        </ul>
      </div>
    </div>
  );
}
