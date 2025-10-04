"use server";

import { getDaysSinceStart } from "@/utils/randomSeed";

// import { backgroundRemoval } from "@/utils/background-removal";

// Simple seeded pseudo-random number generator (LCG)

export const apiCharacters = async (): Promise<
  { title: string; name: string; image: string } | { error: string }
> => {
  const daysSinceStart = getDaysSinceStart();

  // Create a seed from the current date (UTC) to ensure it'''s the same for all users regardless of timezone

  const BASE_URL = "https://api.jikan.moe/v4/top/anime";

  // Using Next.js fetch caching to avoid hitting the API on every request.
  // Revalidates every hour. The seeded random ensures the same character is picked for the day.
  const top_anime = await fetch(BASE_URL, { next: { revalidate: 3600 } }).then(
    (res) => res.json()
  );

  if (!top_anime.data || top_anime.data.length === 0) {
    // Handle the case where no anime data is returned

    const error =
      "Something went wrong on our side. We,re on it! Give us a minute, then try again";

    return { error };
  }

  const animeNum = daysSinceStart % top_anime.data.length;

  const anime = top_anime.data[animeNum];

  if (!anime || !anime.mal_id) {
    // Handle the case where anime data is incomplete
    const error =
      "Something went wrong on our side. We,re on it! Give us a minute, then try again";

    return { error };
  }

  const id = anime.mal_id;

  const url = `https://api.jikan.moe/v4/anime/${id}/characters`;

  const animeCharacter = await fetch(url, { next: { revalidate: 3600 } }).then(
    (res) => res.json()
  );

  if (!animeCharacter.data) {
    const error =
      "Something went wrong on our side. We,re on it! Give us a minute, then try again";

    return { error };
  }

  const mainCharacters = animeCharacter.data.filter(
    (value: { role: string }) => value.role === "Main"
  );

  if (mainCharacters.length === 0) {
    // Handle the case where there are no main characters
    const error =
      "Something went wrong on our side. We,re on it! Give us a minute, then try again";

    return { error };
  }

  const characterNum = daysSinceStart % mainCharacters.length;

  const character = mainCharacters[characterNum].character;

  // Loop to find a character with a valid image URL
  for (let i = 0; i < mainCharacters.length; i++) {
    const currentCharacter =
      mainCharacters[(characterNum + i) % mainCharacters.length].character;
    const imageUrl = currentCharacter.images.jpg.image_url;

    if (imageUrl) {
      try {
        // Check if the image URL is valid by attempting to fetch it
        const response = await fetch(imageUrl, { method: "HEAD" });
        if (response.ok) {
          return {
            title: anime.title_english ? anime.title_english : anime.title,
            name: currentCharacter.name,
            image: imageUrl,
          };
        } else {
          console.warn(
            `Invalid image URL for character ${currentCharacter.mal_id}: ${imageUrl}`
          );
        }
      } catch (error) {
        console.error(
          `Error checking image URL for character ${currentCharacter.mal_id}: ${imageUrl}`,
          error
        );
      }
    }
  }

  // If no image URL or invalid, use a placeholder
  return {
    title: anime.title_english ? anime.title_english : anime.title,
    name: character.name,
    image: "/placeholder-character.jpg", // Assuming you have a placeholder for characters
  };
};
