"use client";
import Header from "@/components/header";
import Nav from "@/components/nav";
import TrendingBar from "@/components/trending-bar";
import Loading from "../loading";
import useSWR from "swr";
import { apiCharacters } from "@/services/character-api";
import ErrorPage from "../error";
import { apiUpcoming } from "@/services/upcoming-api";
import UpcomingBar from "@/components/upcoming-bar";
import { apiTrending } from "@/services/trending-api";

export default function Home() {
  const {
    data: characterData,
    isLoading: characterLoading,
    error: characterError,
  } = useSWR("/animeCharacter", apiCharacters);

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useSWR("/trendingAnime", apiTrending);

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    error: upcomingError,
  } = useSWR("/upcomingAnime", apiUpcoming);

  if (
    characterLoading ||
    trendingLoading ||
    upcomingLoading ||
    !characterData ||
    !trendingData ||
    !upcomingData
  ) {
    if (
      (characterData && "error" in characterData && characterData.error) ||
      (trendingData && "error" in trendingData && trendingData.error) ||
      (upcomingData && "error" in upcomingData && upcomingData.error)
    ) {
      return (
        <ErrorPage
          message={
            characterData && "error" in characterData
              ? characterData.error
              : trendingData && "error" in trendingData
              ? trendingData.error
              : upcomingData && "error" in upcomingData
              ? upcomingData.error
              : ""
          }
        />
      );
    }
    return <Loading />;
  } else if (
    characterError ||
    trendingError ||
    (characterData && "error" in characterData && characterData.error) ||
    (trendingData && "error" in trendingData && trendingData.error) ||
    (upcomingData && "error" in upcomingData && upcomingData.error)
  ) {
    // This condition seems redundant with the one above, and the message is not specific.
    return (
      <ErrorPage
        message={
          characterError
            ? characterError
            : trendingError
            ? trendingError
            : upcomingError
            ? upcomingError
            : ""
        }
      />
    );
  }

  return (
    <div className="home">
      <Nav />
      <Header image={"/images/no-image.png"} />
      <p className="title">Trending anime</p>
      <TrendingBar />
      <p className="title">Upcoming anime</p>
      <UpcomingBar />
    </div>
  );
}
