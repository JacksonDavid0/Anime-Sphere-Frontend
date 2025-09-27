"use client";
import Header from "@/components/header";
import Nav from "@/components/nav";
import TrendingBar from "@/components/trending-bar";
import Loading from "../loading";
import useSWR from "swr";
import { apiCharacters } from "@/services/character-api";
import { apiTrending } from "@/services/trending-api";
import ErrorPage from "../error";

export default function Home() {
  const {
    data: characterData,
    isLoading: characterLoading,
    error: characterError,
  } = useSWR("/character", apiCharacters);

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useSWR("/trending", apiTrending);

  if (characterError || trendingError) {
    return <div>{characterError ? characterError : trendingError}</div>;
  } else if (
    characterLoading ||
    trendingLoading ||
    !characterData ||
    !trendingData
  ) {
    return <ErrorPage />;
  } else console.log(trendingData);
  return (
    <div className="home">
      <Nav />
      <Header image={"/images/no-image.png"} />
      <TrendingBar />
    </div>
  );
}
