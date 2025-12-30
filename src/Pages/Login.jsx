import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firestore";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Login successful");
    } catch (error) {
      console.log(error);
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
