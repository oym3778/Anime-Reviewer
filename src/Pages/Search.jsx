export function Search() {
  const animes = [
    "Jujutsu Kaisen",
    "One Piece",
    "Attack on Titan",
    "My Hero Academia",
    "Demon Slayer",
    "Naruto",
    "Fullmetal Alchemist: Brotherhood",
    "One Punch Man",
    "Hunter x Hunter",
    "Death Note",
  ];

  return (
    <div className="flex flex-col items-center bg-orange-700 min-h-screen py-20">
      <label className="flex flex-col w-full max-w-[500px] text-white font-semibold mb-10">
        Search
        <input
          className="mt-2 p-3 rounded-lg bg-white text-black shadow-md"
          type="text"
          id="search"
        />
      </label>

      <div
        id="search-result"
        className="bg-orange-500 max-w-[1200px] p-10 rounded-xl shadow-xl"
      >
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {animes.map((name) => (
            <li key={name} className="flex flex-col items-center text-center">
              <h1 className="text-white font-bold mb-2 text-lg">{name}</h1>
              <img
                className="rounded-lg shadow-md hover:scale-105 transition"
                src="https://placehold.co/200x300"
                alt={`${name} poster`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
