import { db, auth } from "../config/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState(null); // Firebase Auth user
  const [userData, setUserData] = useState(null); // Firestore user document
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Register a Firebase auth state listener when the component mounts.
    // Firebase immediately invokes this callback with the current auth state
    // and again whenever the user logs in or out.
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);

      // If no user is logged in, reset user-related state
      if (!currentUser) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "Users", currentUser.uid);
      const snap = await getDoc(ref);

      setUserData(snap.exists() ? snap.data() : null);
      setLoading(false);
    });

    // Cleanup: remove the Firebase auth listener when the component unmounts
    return () => unsubscribe();
    // Intentionally empty dependency array:
    // Auth listener manages its own lifecycle
  }, []);

  return { user, userData, loading };
}
