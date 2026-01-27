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

  // Currently, I never retrieve an anime from firestore, since if I really needed too,
  // I can get it from the AniList API
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Anime(data);
  },
};

export default animeConverter;
