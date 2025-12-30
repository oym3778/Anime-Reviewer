import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Friends } from "./Pages/Friends";
import { MyReviews } from "./Pages/MyReviews";
import { Search } from "./Pages/Search";
import { Review } from "./Pages/Review";
import { Profile } from "./Pages/Profile";
import { Layout } from "./Components/Layout";
import { auth } from "./config/firestore";
import { useEffect, useState } from "react";
import { Spinner } from "./Components/Spinner";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  // TODO Come back and get a new spinner, maybe...
  if (loading) return <Spinner />;
  return (
    <HashRouter>
      <Routes>
        {/* Public routes */}
        {/* replace is used to prevent someone from logging in and pressing the back  leading them back to the login screen, if 
        they want to logout I direct them to the profile page where the logout button should be fairly obvious */}
        <Route
          path="/"
          element={user ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        {/* if the user logsout, they will be directed back to the login screen from all other open tabs

            Also prevent someone from typing in one of the paths without logging in first, 
            TODO might want a default(index) screen, but dont see why right now
        */}
        <Route element={user ? <Layout /> : <Navigate to="/" replace />}>
          <Route path="profile" element={<Profile />} />
          <Route path="friends" element={<Friends />} />
          <Route path="myreviews" element={<MyReviews />} />
          <Route path="review" element={<Review />} />
          <Route path="search" element={<Search />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
