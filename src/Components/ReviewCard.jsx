export default function ReviewCard({ review, handleUpdate, handleDelete }) {
  const coverImg = review.coverImg;
  const displayTitle = review.title;
  const userReview = review.review;

  return (
    <li
      className="bg-purple-500 rounded-xl shadow-lg p-6 
                   flex gap-6 w-[750px]"
    >
      {/* Cover Image */}
      <img
        className="w-[120px] h-[180px] object-cover rounded"
        src={coverImg}
        alt={displayTitle}
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h1 className="text-2xl font-semibold mb-3">{displayTitle}</h1>
          <p className="leading-relaxed">{userReview}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          {/* Friend Review Button */}
          {/* TODO
              1) Support multiple friend reviews (count + future modal)
              2) Rename; button should clearly communicate AI-powered friend insights
              3) Disable (not hide) when no friend reviews exist for discoverability
              4) Remove pulse animation after first interaction
          */}
          <button
            className="px-5 py-2 rounded-full 
                       bg-cyan-400 text-black font-semibold
                       shadow-lg shadow-cyan-400/50
                       ring-2 ring-cyan-300
                       animate-pulse
                       hover:animate-none
                       hover:scale-105 hover:bg-cyan-300
                       transition hover:cursor-pointer"
          >
            AI Friend Review
          </button>

          {/* Edit / Delete */}
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
