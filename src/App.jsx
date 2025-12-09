import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Friends } from "./Pages/Friends";
import { MyReviews } from "./Pages/MyReviews";
import { Search } from "./Pages/Search";
import { Review } from "./Pages/Review";
import { Profile } from "./Pages/Profile";
import { Layout } from "./Components/Layout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />{" "}
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path="/Friends" element={<Friends />} />
          <Route path="/MyReviews" element={<MyReviews />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
