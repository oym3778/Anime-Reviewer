import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firestore";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { toast } from "react-toastify";
import { showToast } from "../utilities/errorLogger";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In...");
    try {
      // I believe this fixes the firefox ETP issue, keeps persistence of browser sessions,
      // so if user closes browser out, we log them out
      // review https://jorgevergara.co/blog/firebase-auth-persistence/ if changes arise
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      showToast(toastId, "Login Successful!", "success");
    } catch (error) {
      console.log("Login error: " + error);
      showToast(toastId, "Invalid Credentials");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-blue-700">
      <h1 className="text-5xl font-bold text-white mb-10">Revo</h1>
      <form
        className="
          bg-white/20 backdrop-blur 
          flex flex-col gap-9 
          w-[90%] max-w-[600px] 
          p-8
          rounded-2xl shadow-xl
        "
        onSubmit={handleLogin}
      >
        <label className="flex flex-col text-white font-medium" htmlFor="email">
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

        <button
          type="submit"
          className="
            w-full py-3 rounded-xl 
            bg-blue-900 text-white 
            font-semibold hover:bg-blue-800 transition hover:cursor-pointer 
          "
        >
          Login
        </button>
      </form>
      <Link
        to="/SignUp"
        className="
          text-center mt-4 w-[90%] max-w-[400px] py-3 rounded-xl 
          bg-black/40 text-white font-semibold 
          hover:bg-black/50 transition hover:cursor-pointer 
        "
        id="Sign-Up"
      >
        Sign-Up
      </Link>
    </div>
  );
}
