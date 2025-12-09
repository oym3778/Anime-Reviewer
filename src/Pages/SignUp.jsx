import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
export function SignUp() {
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
            />
          </label>
          <label
            className="flex flex-col text-white font-medium"
            htmlFor="password"
          >
            Re-Enter Password
            <input
              required
              className="mt-1 p-2 rounded-md bg-white text-black"
              type="password"
              id="password"
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
