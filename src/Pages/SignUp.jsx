import { Link } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firestore";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReEnter, setPasswordReEnter] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // TODO check to see if username is valid, i think firebase has some valid checks we can use
    let user = null;
    try {
      // We need to set up a Firebase Transaction
      // 1) Check if Usernames/{username} exists
      //    if not:
      //      Create it
      //      Create Users/{uid}
      //    else username already taken, please enter a different one
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      user = userCredential.user;

      await runTransaction(db, async (transaction) => {
        const usernameRef = doc(db, "Usernames", username);
        const userRef = doc(db, "Users", user.uid);

        const usernameSnap = await transaction.get(usernameRef);
        // TODO add some more logic for username uniquness, toLower() trim() etc
        if (usernameSnap.exists()) {
          throw new Error("Username already exists");
        }

        const createdAt = serverTimestamp();

        transaction.set(usernameRef, {
          uid: user.uid,
          createdAt: createdAt,
        });

        transaction.set(userRef, {
          username,
          bio: "",
          reviews: [],
          profilePicture:
            "https://s4.anilist.co/file/anilistcdn/character/large/b8298-ATUVKng0oyHR.png",
          createdAt: createdAt,
        });

        navigate("/Profile");
        //TODO if you want to add some sort of toast message react toasity has some pre-built popups you can use
      });
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
          flex flex-col gap-9 
          w-[90%] max-w-[600px] 
          p-8
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
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
