import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Friends } from "./pages/Friends";
import { MyReviews } from "./pages/MyReviews";
import { Search } from "./pages/Search";
import { AIReview } from "./pages/AIReview";
import { Review } from "./pages/Review";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";
import { Spinner } from "./components/Spinner";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <HashRouter>
      <ToastContainer
        ariaLabel="Auth notifications"
        position="bottom-center"
        stacked
      />
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

            Also prevent someone from typing in one of the paths without logging in first
        */}
        <Route element={user ? <Layout /> : <Navigate to="/" replace />}>
          <Route path="profile" element={<Profile />} />
          <Route path="friends" element={<Friends />} />
          <Route path="myreviews" element={<MyReviews />} />
          <Route path="review" element={<Review />} />
          <Route path="search" element={<Search />} />
          <Route path="aireview" element={<AIReview />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
