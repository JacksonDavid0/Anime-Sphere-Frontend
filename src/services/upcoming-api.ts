"use server";

import { random } from "@/utils/randomSeed";
export interface Anime {
  mal_id: number;
  title: string;
  url: string;
  image_url: string;
  date: string;
  genre: string;
}

export const apiUpcoming = async (): Promise<
  // Changed return type to include error
  Anime[] | { error: string }
> => {
  const BASE_URL = "https://api.jikan.moe/v4/seasons/upcoming"; // Using anime ID 1 (Cowboy Bebop) for news

  // Create a seed from the current date (UTC) to ensure it's the same for all users regardless of timezone

  const animeUpcoming = await fetch(BASE_URL, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  if (!animeUpcoming.data || animeUpcoming.data.length === 0) {
    const error =
      "Something went wrong on our side. We're on it! Give us a minute, then try again";
    return { error };
  }

  // Shuffle news articles to get random ones
  const shuffledUpcoming = [...animeUpcoming.data];
  for (let i = shuffledUpcoming.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffledUpcoming[i], shuffledUpcoming[j]] = [
      shuffledUpcoming[j],
      shuffledUpcoming[i],
    ];
  }

  // Take the first 3 news articles
  const upcomingData: {
    mal_id: number;
    title: string;
    url: string;
    image_url: string;
    date: string;
    genre: string;
  }[] = [];

  for (
    let i = 0;
    upcomingData.length < 10 && i < shuffledUpcoming.length;
    i++
  ) {
    const upcoming = shuffledUpcoming[i];
    const imageUrl = upcoming.images?.jpg?.large_image_url;

    if (imageUrl) {
      try {
        // Check if the image URL is valid by attempting to fetch it
        const response = await fetch(imageUrl, { method: "HEAD" });
        if (response.ok) {
          upcomingData.push({
            mal_id: upcoming.mal_id,
            title: upcoming.title_english || upcoming.title,
            url: upcoming.url,
            image_url: imageUrl, // Use imageUrl directly
            date: upcoming.aired.string, // Assuming 'aired.string' contains the date
            genre:
              upcoming.genres
                .map((genre: { name: string }) => genre.name)
                .join(", ") || "Unknown", // Get all genre names
          });
        } else {
          console.warn(
            `Invalid image URL for upcoming api ${upcoming.mal_id}: ${imageUrl}`
          );
        }
      } catch (error) {
        console.error(
          `Error checking image URL for upcoming api ${upcoming.mal_id}: ${imageUrl}`,
          error
        );
      }
    }
  }
  return upcomingData;
};
