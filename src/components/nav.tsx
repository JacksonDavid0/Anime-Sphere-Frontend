"use client";

import Link from "next/link";
import Logo from "./logo";
import { FaBars, FaRegNewspaper } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import ThemeBtn from "./theme-btn";
import { CiHome, CiSquareInfo, CiViewList } from "react-icons/ci";
import { GiCharacter } from "react-icons/gi";
import { RiCommunityLine } from "react-icons/ri";
import { TiMessageTyping } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";

export default function Nav({
  setComponentsLoading,
}: {
  setComponentsLoading?: Dispatch<SetStateAction<boolean>>;
}) {
  if (setComponentsLoading) {
    setComponentsLoading(false);
  }
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="container">
        <Logo className="nav-logo" />

        <div className={`navbar-links ${isActive ? "is-active" : ""}`}>
          <Link href="/" {...(pathname === "/" && { className: "is-active" })}>
            <CiHome />
            Home
          </Link>
          <Link
            href="/anime-list"
            {...(pathname === "/anime-list" && { className: "is-active" })}
          >
            <CiViewList />
            Anime List
          </Link>
          <Link
            href="/characters"
            {...(pathname === "/characters" && { className: "is-active" })}
          >
            <GiCharacter />
            Characters
          </Link>
          <Link
            href="/news"
            {...(pathname === "/news" && { className: "is-active" })}
          >
            <FaRegNewspaper />
            News
          </Link>
          <Link
            href="/community"
            {...(pathname === "/community" && { className: "is-active" })}
          >
            <RiCommunityLine />
            Community
          </Link>

          <Link
            href="/messages"
            {...(pathname === "/messages" && { className: "is-active" })}
          >
            <TiMessageTyping />
            Messages
          </Link>

          {isActive ? (
            <Link
              href="/about-us"
              {...(pathname === "/about-us" && { className: "is-active" })}
            >
              <CiSquareInfo />
              About Us
            </Link>
          ) : (
            ""
          )}

          {isActive ? (
            <Link
              href="/profile"
              {...(pathname === "/profile" && { className: "is-active" })}
            >
              <CgProfile />
              Profile
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="btn-holder">
          <button
            className="nav-bar"
            onClick={() => (isActive ? setIsActive(false) : setIsActive(true))}
          >
            <FaBars />
          </button>

          <ThemeBtn />
        </div>
      </div>
    </nav>
  );
}
