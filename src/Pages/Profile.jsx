import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firestore";
import { useUser } from "../hooks/useUser";
import { Spinner } from "../components/Spinner";

export function Profile() {
  const { user, userData, loading } = useUser();
  const navigate = useNavigate();

  // Never intended to run, a safety feature just in case,
  // if user isn't logged in, the App component should already direct them to the login page
  useEffect(() => {
    if (!loading && !user) {
      navigate("/Login");
    }
  }, [loading, user, navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // prevents the user from seeing default values
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner loadingText="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-auto h-screen bg-green-700">
      <div className="flex flex-row justify-around items-center w-[80%] h-[60%] bg-green-500 rounded-2xl shadow-xl">
        <img
          className="hover:cursor-pointer border-6 border-green-700 rounded-full object-cover w-[350px] h-[350px]"
          src={userData ? userData.profilePicture : ""}
          alt="Profile"
        />

        <div className="flex flex-col justify-center w-[50%] gap-6">
          <h2 className="text-2xl font-bold">
            {/* The syntax here: instead of checking if userData is null, 
            use '?' optional chainging operator to safely return "Unknown User" 
            and ?? is used to provide a default if the left side returns null */}
            {userData?.username ?? "Unknown user"}
          </h2>

          <textarea
            placeholder="Your short bio will appear next to your avatar"
            className="w-full min-h-[200px] p-4 rounded-xl bg-green-700 text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-green-300 resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-700 mt-4 w-[90%] max-w-[400px] py-3 rounded-xl 
                   text-white font-semibold hover:bg-red-500/90 transition hover:cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
