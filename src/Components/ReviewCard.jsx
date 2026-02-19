import Anime from "../utilities/Anime";
import { Link } from "react-router-dom";
export default function ReviewCard({
  review,
  anime,
  handleUpdate,
  handleDelete,
  friendReviewCount,
}) {
  // TODO expand on the reviews!
  //  -Favorite Character
  //  -Favorite Momment
  //  NOTE: using openEnded as default for now
  const userReview = review.openEnded;
  const currentAnime = new Anime(anime);

  return (
    <li
      className="bg-purple-500 rounded-xl shadow-lg p-6 
                   flex gap-6 w-[750px]"
    >
      {/* Cover Image */}
      <img
        className="w-[120px] h-[180px] object-cover rounded"
        src={currentAnime.largeCoverImg}
        alt={currentAnime.displayTitle}
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-2xl font-semibold mb-3">
            {currentAnime.displayTitle}
          </h1>
          <p className="leading-relaxed">{userReview}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          {/* Friend Review Button */}
          {/* TODO
              1) Support multiple friend reviews (count + future modal)
              3) Disable (not hide) when no friend reviews exist for discoverability
              4) Remove pulse animation after first interaction
          */}

          {/* Make an accordian style button          
               <details>
                <summary>Dropdown Button</summary>
                <ul>
                  <li>
                    <a href="#">Option 1</a>
                  </li>
                  <li>
                    <a href="#">Option 2</a>
                  </li>
                </ul>
              </details>
          */}
          {/* TODO OMAR READDDDD THISSSSS SECOND THING */}
          <div className="relative inline-block group">
            {friendReviewCount.length > 0 ? (
              <>
                {/* Main AI Button */}
                <button
                  className="px-5 py-2 rounded-full 
                   bg-cyan-400 text-black font-semibold
                   shadow-lg shadow-cyan-400/40
                   ring-2 ring-cyan-300
                   transition duration-200
                   group-hover:scale-105 
                   group-hover:bg-cyan-300"
                >
                  AI Friend Review
                </button>

                {/* Hover Dropdown */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
                  <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-400/40  rounded-xl shadow-xl p-4 animate-in fade-in zoom-in-95">
                    <p className=" text-sm text-cyan-300 font-semibold mb-2">
                      Friend(s) who reviewed:
                    </p>

                    <ul className=" space-y-2">
                      {friendReviewCount.map((friend) => (
                        <li key={friend}>
                          <a
                            href="#"
                            className="block px-3 py-2 rounded-lg
                                bg-slate-800 hover:bg-cyan-500/20
                                text-white text-sm
                                transition"
                          >
                            {friend}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <button
                disabled
                className="px-5 py-2 rounded-full 
                 bg-gray-400 text-black font-semibold
                 shadow-lg shadow-gray-400/50
                 ring-2 ring-gray-300 cursor-not-allowed"
              >
                AI Friend Review
              </button>
            )}
          </div>

          {/* Update / Delete */}
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded-lg bg-yellow-500 
                         text-black font-medium 
                         hover:bg-yellow-400 transition hover:cursor-pointer"
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg bg-red-600 
                         text-white font-medium 
                         hover:bg-red-500 transition hover:cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
