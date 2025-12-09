export function Profile() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-green-700">
        <div className="flex flex-row justify-around items-center w-[80%] h-[60%] bg-green-500 rounded-2xl shadow-xl">
          <img
            className="border-6 border-green-700 rounded-[100%] object-cover w-[350px] h-[350px]"
            src="https://i.pinimg.com/736x/3d/0e/d3/3d0ed37c45061192214c2e8291e06384.jpg"
            alt="pfp"
          />
          <div
            className="flex flex-col justify-center w-[50%] gap-6"
            id="summary"
          >
            <h2 className="text-2xl font-bold">Gamertag</h2>
            <textarea
              placeholder="Your short bio will appear next to your avatar"
              name="bio"
              id="bio"
              className="w-full min-h-[200px] p-4 rounded-xl bg-green-700 text-white placeholder-white/60 outline-none focus:ring-4 focus:ring-green-300 resize-none"
            ></textarea>
          </div>
        </div>
        <button
          className="bg-red-700
          mt-4 w-[90%] max-w-[400px] py-3 rounded-xl 
          text-white font-semibold 
          hover:bg-red-500/90 transition hover:cursor-pointer 
        "
        >
          Logout
        </button>
      </div>
    </>
  );
}
