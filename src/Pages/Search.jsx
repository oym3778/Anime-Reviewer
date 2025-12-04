export function Search() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-orange-700 min-h-screen h-auto">
        <label className="label mt-70 w-80 bg-orange-500" htmlFor="search">
          Search
          <input className="input" type="text" input="search" />
        </label>
        <div
          className="bg-orange-500 mx-10 mb-10 p-10 h-full"
          id="search-result"
        >
          <ul className="flex flex-wrap justify-center items-center">
            <li>
              <h1>Jujutsu Kaisen</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Jujutsu Kaisen poster"
              />
            </li>
            <li>
              <h1>One Piece</h1>
              <img src="https://placehold.co/200x300" alt="One Piece poster" />
            </li>
            <li>
              <h1>Attack on Titan</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Attack on Titan poster"
              />
            </li>
            <li>
              <h1>Jujutsu Kaisen</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Jujutsu Kaisen poster"
              />
            </li>
            <li>
              <h1>Jujutsu Kaisen</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Jujutsu Kaisen poster"
              />
            </li>
            <li>
              <h1>My Hero Academia</h1>
              <img
                src="https://placehold.co/200x300"
                alt="My Hero Academia poster"
              />
            </li>
            <li>
              <h1>Demon Slayer</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Demon Slayer poster"
              />
            </li>
            <li>
              <h1>Naruto</h1>
              <img src="https://placehold.co/200x300" alt="Naruto poster" />
            </li>
            <li>
              <h1>Fullmetal Alchemist: Brotherhood</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Fullmetal Alchemist: Brotherhood poster"
              />
            </li>
            <li>
              <h1>One Punch Man</h1>
              <img
                src="https://placehold.co/200x300"
                alt="One-Punch Man poster"
              />
            </li>
            <li>
              <h1>Hunter x Hunter</h1>
              <img
                src="https://placehold.co/200x300"
                alt="Hunter x Hunter poster"
              />
            </li>
            <li>
              <h1>Death Note</h1>
              <img src="https://placehold.co/200x300" alt="Death Note poster" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
