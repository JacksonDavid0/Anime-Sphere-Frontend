"use client";

import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Anime } from "@/services/upcoming-api";

export default function UpcomingBar() {
  const { data } = useSWR("/upcomingAnime");

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      centeredSlides={true}
      spaceBetween={30}
      slidesPerView={3}
      pagination={{ clickable: true, type: "progressbar" }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      // scrollbar={{ draggable: true }}
      className="trending-swiper upcoming-bar"
    >
      {data?.map((anime: Anime) => (
        <SwiperSlide key={anime.mal_id} className="swiper-slide">
          <Link href={"/"} target="_blank" className="swiper-link">
            <Image
              src={anime.image_url}
              alt={anime.title}
              width={225}
              height={320}
              className="swiper-image"
            />
            <div className="swiper-text">
              <p className="swiper-title">Title: {anime.title}</p>
              <p className="">Genre: {anime.genre}</p>
              <p className="">Date: {anime.date}</p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
