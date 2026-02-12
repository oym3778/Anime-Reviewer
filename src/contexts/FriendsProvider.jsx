import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firestore";
import { FriendsContext } from "./FriendsContext";

export function FriendsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState(new Set());

  // When the logged-in user changes, attach a realtime listener
  // to that user's pending friend requests
  // TODO add the pending request to context
  //   useEffect(() => {
  //     if (!user?.uid) return;

  //     // Query pending friend requests where the current user is the responder
  //     const q = query(
  //       collection(db, "FriendRequests"),
  //       where("responderUID", "==", user.uid),
  //       where("status", "==", "pending"),
  //     );

  //     // Attach a realtime Firestore listener:
  //     // - runs immediately with current data
  //     // - re-runs whenever matching documents change
  //     // onSnapshot returns a function that cancels the Firestore listener.
  //     // React's cleanup phase is where we call that cancellation function.
  //     const unsubscribe = onSnapshot(
  //       q,
  //       { includeMetadataChanges: true },
  //       (snapshot) => {
  //         const requests = snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));

  //         setFriendRequests(requests);

  //         // NOTE: I wanted to figure out how many reads these snapshot listeners cost me and found that
  //         // firestore does a great job of caching the data for you, even if youu decide
  //         // to go to another tab, i.e profile page and come back, as long as the
  //         // data for that snapshot hasnt changed, it'll cost no adiitonal read
  //         // using includeMetadataChanges: true allows you to receive more granular information
  //         // if (snapshot.metadata.fromCache) {
  //         //   console.log("Data came from local cache (maybe stale)");
  //         // } else {
  //         //   console.log("Data came from the server (fresh)");
  //         // }
  //       },
  //     );
  //     // on unmount firebase will automaticlally stop listening for use and remove listener
  //     return () => unsubscribe();

  //     // user?.uid is a dependency not because Firestore updates,
  //     // but because the active user's identity determines
  //     // which realtime listener should exist
  //   }, [user?.uid]);

  // Check to see if the user has friends, set friends
  useEffect(() => {
    if (!user?.uid) return;

    const friendsRef = collection(db, "Users", user.uid, "friends");

    const unsubscribe = onSnapshot(friendsRef, (snapshot) => {
      // NOTE Was testing to see if on delete would give me precise data, but this just
      // tells you if a change was made and what time
      // snapshot.docChanges().forEach((change) => {
      //   if (change.type === "added") {
      //     console.log("New friend: ", change.doc.data());
      //   }
      //   if (change.type === "modified") {
      //     console.log("Modified friend: ", change.doc.data());
      //   }
      //   if (change.type === "removed") {
      //     console.log("Removed friend: ", change.doc.data());
      //   }
      // });
      const friendSet = new Set(snapshot.docs.map((doc) => doc.id));
      setFriends(friendSet);
    });
    return unsubscribe;
  }, [user]);

  console.log(friends);
  return (
    <FriendsContext.Provider value={friends}>
      {children}
    </FriendsContext.Provider>
  );
}
