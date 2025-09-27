"use client";

import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

interface Anime {
  mal_id: number;
  url: string;
  images: {
    webp: {
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
}

// import Slider from "react-slick";

export default function TrendingBar() {
  const { data } = useSWR("/trending");
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
      className="swiper"
    >
      {data?.map((anime: Anime) => (
        <SwiperSlide key={anime.mal_id} className="swiper-slide">
          <Link href={"/"} target="_blank" className="swiper-link">
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              width={225}
              height={320}
              className="swiper-image"
            />
            <p className="swiper-title">
              {anime.title_english ? anime.title_english : anime.title}
            </p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
