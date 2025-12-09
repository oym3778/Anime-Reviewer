export function Review() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-700 p-6">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center mb-12">
        <img
          className="rounded-xl shadow-lg w-[250px] md:w-[300px]"
          src="https://placehold.co/300x400"
          alt="Jujutsu Kaisen poster"
        />
        <h1 className="text-5xl mt-6 font-bold tracking-wide text-white">
          Jujutsu Kaisen
        </h1>
      </div>

      {/* Review Form */}
      <form className="max-w-[800px] w-full flex flex-col gap-6">
        <label htmlFor="review-input" className="text-3xl text-white">
          Leave Your Review
        </label>

        <textarea
          required
          id="review-input"
          className="w-full min-h-[200px] p-4 rounded-xl bg-pink-500 text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-pink-300 resize-none"
          placeholder="Write something..."
        ></textarea>

        <div className="flex flex-row gap-6">
          <button className="button w-[50%] py-3 bg-white text-pink-700 font-bold rounded-xl shadow-md hover:bg-white/50 hover:cursor-pointer transition">
            Submit
          </button>
          <button
            disabled
            className="button w-[50%] py-3 bg-white text-pink-700 font-bold rounded-xl shadow-md hover:bg-white/50 hover:cursor-pointer transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
