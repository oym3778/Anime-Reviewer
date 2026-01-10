import { useNavigate } from "react-router-dom";
import Anime from "../models/Anime";

export default function AnimeCard({ anime }) {
  const currentAnime = new Anime(anime);

  const navigate = useNavigate();
  const handleClick = () => {
    // Since These Cards dont have review information and we just want to display the default anime
    // The user will fill in the review on the review page
    // Similar to /MyReviews except /MyReviews navigates to the /review page to update a review
    // which is why /review should always expect a review and an anime
    const review = {};
    navigate("/review", { state: { anime, review } });
  };

  return (
    <li
      onClick={handleClick}
      className="bg-neutral-900 hover:cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col w-full transition-transform duration-100 hover:scale-105"
    >
      {/* Image container */}
      <div className="w-full aspect-[3/4] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={currentAnime.largeCoverImg}
          alt={`${currentAnime.displayTitle} poster`}
        />
      </div>

      {/* Title container */}
      <p className="p-3 text-white font-semibold text-sm text-center break-words">
        {currentAnime.displayTitle}
      </p>
      <p className="pb-2 text-white text-sm text-center">
        {currentAnime.animeId}
      </p>
    </li>
  );
}
