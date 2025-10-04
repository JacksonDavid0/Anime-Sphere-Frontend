"use server";

import { random } from "@/utils/randomSeed";

export interface TrendingAnime {
  mal_id: number;
  title: string;
  url: string;
  image_url: string;
  status: string;
  genre: string;
}

export const apiTrending = async (): Promise<
  // Changed return type to include error

  TrendingAnime[] | { error: string }
> => {
  const BASE_URL = "https://api.jikan.moe/v4/top/anime"; // Using anime ID 1 (Cowboy Bebop) for news

  // Create a seed from the current date (UTC) to ensure it's the same for all users regardless of timezone

  const animeTrending = await fetch(BASE_URL, {
    next: { revalidate: 3600 },
  }).then((res) => res.json());
  if (!animeTrending.data || animeTrending.data.length === 0) {
    const error =
      "Something went wrong on our side. We're on it! Give us a minute, then try again";
    return { error };
  }

  // Shuffle news articles to get random ones
  const shuffledTrending = [...animeTrending.data];
  for (let i = shuffledTrending.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffledTrending[i], shuffledTrending[j]] = [
      shuffledTrending[j],
      shuffledTrending[i],
    ];
  }

  // Take the first 3 news articles
  const trendingData: TrendingAnime[] = [];

  for (
    let i = 0;
    trendingData.length < 10 && i < shuffledTrending.length;
    i++
  ) {
    const trending = shuffledTrending[i];
    const imageUrl = trending.images?.jpg?.large_image_url;

    if (imageUrl) {
      try {
        // Check if the image URL is
        const response = await fetch(imageUrl, { method: "HEAD" });
        if (response.ok) {
          trendingData.push({
            mal_id: trending.mal_id,
            title: trending.title_english || trending.title,
            url: trending.url,
            image_url: imageUrl, // Use imageUrl directly
            status: trending.status,
            genre:
              trending.genres
                .map((genre: { name: string }) => genre.name)
                .join(", ") || "Unknown", // Get all genre names
          });
        }
      } catch (error) {
        // Do nothing, just try the next one
        console.error(
          `Error checking image URL for trending api ${trending.mal_id}: ${imageUrl}`,
          error
        );
      }
    }
  }
  return trendingData;
};
