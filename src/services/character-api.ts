"use server";

// import { backgroundRemoval } from "@/utils/background-removal";

// Simple seeded pseudo-random number generator (LCG)
function seededRandom(seed: number) {
  let state = seed;
  return function () {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export const apiCharacters = async () => {
  // Create a seed from the current date (UTC) to ensure it's the same for all users regardless of timezone.
  const today = new Date();
  const seed =
    today.getUTCFullYear() * 10000 +
    (today.getUTCMonth() + 1) * 100 +
    today.getUTCDate();
  const random = seededRandom(seed);

  const BASE_URL = "https://api.jikan.moe/v4/top/anime";

  // Using Next.js fetch caching to avoid hitting the API on every request.
  // Revalidates every hour. The seeded random ensures the same character is picked for the day.
  const top_anime = await fetch(BASE_URL, { next: { revalidate: 3600 } }).then(
    (res) => res.json()
  );

  if (!top_anime.data || top_anime.data.length === 0) {
    // Handle the case where no anime data is returned
    return null;
  }

  const animeNum = Math.floor(random() * top_anime.data.length);

  const anime = top_anime.data[animeNum];

  if (!anime || !anime.mal_id) {
    // Handle the case where anime data is incomplete
    return null;
  }

  const id = anime.mal_id;

  const url = `https://api.jikan.moe/v4/anime/${id}/characters`;

  const animeCharacter = await fetch(url, { next: { revalidate: 3600 } }).then(
    (res) => res.json()
  );

  if (!animeCharacter.data) {
    return null;
  }

  const mainCharacters = animeCharacter.data.filter(
    (value: { role: string }) => value.role === "Main"
  );

  if (mainCharacters.length === 0) {
    // Handle the case where there are no main characters
    return null;
  }

  const characterNum = Math.floor(random() * mainCharacters.length);

  const character = mainCharacters[characterNum].character;

  const characterObject = {
    title: anime.title,
    name: character.name,
    image: character.images.jpg.image_url,
  };

  // console.log(character);

  // characterObject.image =
  //   (await backgroundRemoval(characterObject.image)) || characterObject.image;

  return characterObject;
};
