"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Header({ image }: { image?: string }) {
  const pathname = usePathname();
  const { data } = useSWR("/animeCharacter");
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === "/");
  }, [pathname]);

  return (
    <header className={`${isHomePage ? "home-header" : ""}`}>
      <Link href={"/"} className="header">
        <div className="header-img">
          <Image
            src={data?.image || image!}
            alt={""}
            className="image"
            width={100}
            height={100}
          />
        </div>
        <div className="header-title">
          <h1>Character of the day</h1>
          <p>{data?.name}</p>
          <p>{data?.title}</p>
        </div>
      </Link>
    </header>
  );
}
{
  /* {characterImage ? <Image src={characterImage} alt="image" /> : ""} */
}
