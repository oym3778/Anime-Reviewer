import Anime from "./Anime";

// Firestore data converter
const animeConverter = {
  toFirestore: (anime) => {
    return {
      coverImage: {
        extraLarge: anime.largeCoverImg,
      },
      id: anime.animeId,
      title: {
        english: anime.titleEng,
        romaji: anime.titleRomaji,
      },
    };
  },
  // TODO Should really test this, but at no point do i
  // want to search for a specific anime from the reviews on its own. as of now atleast...
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Anime(data);
  },
};

export default animeConverter;
