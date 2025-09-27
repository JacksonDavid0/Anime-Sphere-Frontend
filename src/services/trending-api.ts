"use server";

// Simple seeded pseudo-random number generator (LCG)
function seededRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export const apiTrending = async () => {
  const BASE_URL = "https://api.jikan.moe/v4/top/anime";

  const top_anime = await fetch(BASE_URL, { next: { revalidate: 3600 } }).then(
    (res) => res.json()
  );

  if (!top_anime.data || top_anime.data.length === 0) {
    return null;
  }

  // Create a seed from the current date (UTC) to ensure it's the same for all users regardless of timezone.
  const today = new Date();
  const seed =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  const random = seededRandom(seed);

  const tvAnime = top_anime.data.filter(
    (value: { type: string }) => value.type === "TV"
  );

  // Shuffle tvAnime to get random anime from the list
  for (let i = tvAnime.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [tvAnime[i], tvAnime[j]] = [tvAnime[j], tvAnime[i]];
  }

  const trendingAnime = [];
  for (const anime of tvAnime) {
    if (trendingAnime.length >= 10) {
      break;
    }

    let isSeason = false;
    for (const trending of trendingAnime) {
      if (
        trending.title.startsWith(anime.title) ||
        anime.title.startsWith(trending.title)
      ) {
        isSeason = true;
        break;
      }
    }

    if (!isSeason) {
      trendingAnime.push(anime);
    }
  }

  return trendingAnime;
};
