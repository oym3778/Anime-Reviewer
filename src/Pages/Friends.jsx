export function Friends() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-16 bg-yellow-700 p-8">
      {/* Add Friend Form */}
      <form className="bg-yellow-500 p-6 rounded-xl shadow-lg w-full max-w-[500px] flex flex-col gap-4">
        <label
          htmlFor="friend-username"
          className="font-bold text-xl text-yellow-900"
        >
          Username
        </label>

        <input
          required
          type="text"
          id="friend-username"
          className="p-3 rounded-lg bg-yellow-200 text-yellow-900 outline-none focus:ring-4 focus:ring-yellow-300"
          placeholder="Enter username..."
        />

        <button
          type="submit"
          className="mt-2 bg-white text-yellow-700 font-bold py-3 rounded-xl shadow-md hover:bg-white/70 hover:cursor-pointer transition"
        >
          Send Request
        </button>
      </form>

      {/* Pending Requests */}
      <div id="pending-request" className="w-full max-w-[600px]">
        <h2 className="text-3xl font-bold text-white mb-4">Pending Requests</h2>
        <ul className="bg-yellow-500 p-4 rounded-xl shadow-lg flex flex-col gap-4">
          <li className="bg-yellow-600 rounded-xl p-4 flex items-center gap-4 shadow">
            <img
              className="w-[70px] h-[90px] object-cover rounded-lg"
              src="https://i.redd.it/urdubdsb97781.jpg"
              alt="Pending friend"
            />
            <p className="text-xl text-white font-semibold">Omar_M</p>
          </li>
        </ul>
      </div>

      {/* Friends List */}
      <div id="friends-list" className="w-full max-w-[600px]">
        <h2 className="text-3xl font-bold text-white mb-4">Friends</h2>
        <ul className="bg-yellow-500 p-4 rounded-xl shadow-lg flex flex-col gap-4">
          <li className="bg-yellow-600 rounded-xl p-4 flex items-center gap-4 shadow">
            <img
              className="w-[70px] h-[90px] object-cover rounded-lg"
              src="https://i.pinimg.com/736x/3d/0e/d3/3d0ed37c45061192214c2e8291e06384.jpg"
              alt="Friend"
            />
            <p className="text-xl text-white font-semibold">Talia_B</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
