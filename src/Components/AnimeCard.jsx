import { useNavigate } from "react-router-dom";

export function AnimeCard({ anime }) {
  const titleEng = anime.title.english;
  const titleRomaji = anime.title.romaji;
  const coverImg = anime.coverImage.extraLarge;
  const displayTitle = titleEng || titleRomaji;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/review", { state: { anime } });
    // console.log(displayTitle + " Was clicked");
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
          src={coverImg}
          alt={`${displayTitle} poster`}
        />
      </div>

      {/* Title container */}
      <p className="p-3 text-white font-semibold text-sm text-center break-words">
        {displayTitle}
      </p>
    </li>
  );
}
