export function SearchBar({ setInput }) {
  return (
    <>
      <label className="flex flex-col w-full max-w-[500px] text-white font-semibold mb-10">
        Search
        <input
          onChange={(e) => setInput(e.target.value)}
          className="mt-2 p-3 rounded-lg bg-white text-black shadow-md"
          type="text"
          id="search"
        />
      </label>
    </>
  );
}
