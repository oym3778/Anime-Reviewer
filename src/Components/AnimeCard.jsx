export function AnimeCard({ anime }) {
  const titleEng = anime["title"]["english"];
  const titleRomaji = anime["title"]["romaji"];
  const coverImg = anime["coverImage"]["extraLarge"];

  return (
    <>
      <li className="flex flex-col items-center text-center">
        <h1 className="text-white font-bold mb-2 text-lg">
          {titleEng ? titleEng : titleRomaji}
        </h1>
        <img
          className="rounded-lg shadow-md hover:scale-105 transition"
          src={coverImg}
          alt={`${titleEng ? titleEng : titleRomaji}} poster`}
        />
      </li>
    </>
  );
}
