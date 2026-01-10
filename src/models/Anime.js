export default class Anime {
  constructor(data = {}) {
    // Handle multiple possible input shapes safely
    const title = data.title ?? {};
    const coverImage = data.coverImage ?? {};

    this.titleEng = title.english ?? null;
    this.titleRomaji = title.romaji ?? null;
    this.largeCoverImg =
      coverImage.extraLarge ??
      "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg";

    this.animeId = data.id ?? null;

    // Freeze to enforce immutability
    Object.freeze(this);
  }

  get displayTitle() {
    return this.titleEng || this.titleRomaji || "Unknown Title";
  }
}

/*
  Files that rely on the Anime Class
    /AnimeCard.jsx
    /ReviewCard.jsx
    /Review.jsx
*/
