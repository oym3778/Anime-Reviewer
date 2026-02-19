import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firestore";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logError, showToast } from "../utilities/errorLogger";
import {
  setPersistence,
  browserSessionPersistence,
  validatePassword,
} from "firebase/auth";

//TODO Loading spinner isnt displaying, we see unknown user on initial sign up
export function SignUp() {
  const [username, setUsername] = useState("");
  const [isUsernameAllowed, setIsUsernameAllowed] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReEnter, setPasswordReEnter] = useState("");
  const [passwordPolicies, setPasswordPolicies] = useState({
    meetsMinPasswordLength: false,
    meetsMaxPasswordLength: false,
    containsLowercaseLetter: false,
    containsUppercaseLetter: false,
    containsNumericCharacter: false,
    containsNonAlphanumericCharacter: false,
  });
  const PASSWORD_POLICY_META = {
    meetsMinPasswordLength: "At least 6 characters",
    meetsMaxPasswordLength: "No more than 4096 characters",
    containsLowercaseLetter: "Includes a lowercase letter (a-z)",
    containsUppercaseLetter: "Includes an uppercase letter (A-Z)",
    containsNumericCharacter: "Includes a number (0-9)",
    containsNonAlphanumericCharacter: "Includes a special character (!@#$…)",
  };
  const navigate = useNavigate();

  useEffect(() => {
    const checkCredentials = async () => {
      // Password Check
      const status = await validatePassword(auth, password);
      const nextPolicies = {
        meetsMinPasswordLength: status.meetsMinPasswordLength,
        meetsMaxPasswordLength: status.meetsMaxPasswordLength,
        containsLowercaseLetter: status.containsLowercaseLetter,
        containsUppercaseLetter: status.containsUppercaseLetter,
        containsNumericCharacter: status.containsNumericCharacter,
        containsNonAlphanumericCharacter:
          status.containsNonAlphanumericCharacter,
      };

      setPasswordPolicies(nextPolicies);

      // Username Check
      // Letters, numbers, periods, and underscores only.
      const allowedUserRegex = /^[a-zA-Z0-9_.]+$/;
      if (!allowedUserRegex.test(username)) {
        setIsUsernameAllowed(false);
      } else {
        setIsUsernameAllowed(true);
      }
    };
    checkCredentials();
  }, [password, passwordReEnter, username]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let user = null;
    const toastId = toast.loading("Creating Account...");
    try {
      if (password !== passwordReEnter) {
        const { error, uiMessage } = logError("Passwords must match");
        showToast(toastId, uiMessage);
        throw error;
      }
      if (password === username) {
        const { error, uiMessage } = logError(
          "Password should not be your username",
        );
        showToast(toastId, uiMessage);
        throw error;
      }
      // We need to set up a Firebase Transaction
      // 1) Check if Usernames/{username} exists
      //    if not:
      //      Create it
      //      Create Users/{uid}
      //    else username already taken, please enter a different one
      // Explicitly set Firebase Auth persistence
      // I believe this fixes the firefox ETP issue, keeps persistence of browser sessions,
      // so if user closes browser out, we log them out
      // review https://jorgevergara.co/blog/firebase-auth-persistence/ if changes arise
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      ).catch((e) => {
        const { error, uiMessage } = logError(e.message);
        showToast(toastId, uiMessage);
        throw error;
      });

      user = userCredential.user;

      await runTransaction(db, async (transaction) => {
        const usernameRef = doc(db, "Usernames", username.trim().toLowerCase());
        const userRef = doc(db, "Users", user.uid);

        const usernameSnap = await transaction.get(usernameRef);
        if (usernameSnap.exists()) {
          const { error, uiMessage } = logError("Username already exists");
          showToast(toastId, uiMessage);
          throw error;
        }

        const createdAt = serverTimestamp();

        transaction.set(usernameRef, {
          uid: user.uid,
          createdAt: createdAt,
        });

        transaction.set(userRef, {
          username,
          bio: "",
          profilePicture:
            "https://s4.anilist.co/file/anilistcdn/character/large/b8298-ATUVKng0oyHR.png",
          createdAt: createdAt,
        });
      });

      navigate("/profile");
      showToast(toastId, "Account Created!", "success");
    } catch (error) {
      console.log("SignUp Failed: " + error);

      //Rollback Auth user if Firestore failed
      if (user) {
        await user.delete();
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-lime-700">
        <h1 className="text-5xl font-bold text-white mb-10">Revo</h1>

        <form
          className="
          bg-white/20 backdrop-blur 
          flex flex-col 
          w-[90%] max-w-[600px] 
          p-8 gap-3
          rounded-2xl shadow-xl
        "
          onSubmit={handleSignUp}
        >
          <label
            className="flex flex-col text-white font-medium"
            htmlFor="username"
          >
            Username
            <input
              required
              className="mt-1 p-2 rounded-md bg-white text-black"
              type="text"
              id="username"
              minLength={6}
              maxLength={32}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          {!isUsernameAllowed ? (
            <li className="ml-10 text-black-500">
              <p>
                Must contain letters, numbers, periods, and underscores only.
              </p>
            </li>
          ) : (
            ""
          )}
          <label
            className="flex flex-col text-white font-medium"
            htmlFor="email"
          >
            Email
            <input
              required
              className="mt-1 p-2 rounded-md bg-white text-black"
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label
            className="flex flex-col text-white font-medium"
            htmlFor="password"
          >
            Password
            <input
              required
              className="mt-1 p-2 rounded-md bg-white text-black"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <ol className="list-disc ml-10">
            {Object.entries(passwordPolicies).map(([policy, value]) => {
              if (!value) {
                return (
                  <li key={policy} className="text-black-500">
                    <p>{PASSWORD_POLICY_META[policy]}</p>
                  </li>
                );
              }
            })}
          </ol>

          <label
            className="flex flex-col text-white font-medium"
            htmlFor="passwordReEnter"
          >
            Re-Enter Password
            <input
              required
              className="mt-1 p-2 rounded-md bg-white text-black"
              type="password"
              id="passwordReEnter"
              onChange={(e) => setPasswordReEnter(e.target.value)}
            />
          </label>

          <button
            className="
            w-full py-3 rounded-xl 
            bg-lime-900 text-white 
            font-semibold hover:bg-lime-800 transition hover:cursor-pointer 
          "
          >
            Sign-Up
          </button>
        </form>
        <Link
          to="/"
          className="
          text-center mt-4 w-[90%] max-w-[400px] py-3 rounded-xl 
          bg-black/40 text-white font-semibold 
          hover:bg-black/50 transition hover:cursor-pointer 
        "
          id="Sign-Up"
        >
          Login
        </Link>
      </div>
    </>
  );
}
