import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { Friends } from "./Pages/Friends";
import { MyReviews } from "./Pages/MyReviews";
import { Search } from "./Pages/Search";
import { Review } from "./Pages/Review";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/MyReviews" element={<MyReviews />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
