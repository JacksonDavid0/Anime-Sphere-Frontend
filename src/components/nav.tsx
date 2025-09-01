"use client";

import Link from "next/link";
import Logo from "./logo";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeBtn from "./theme-btn";

export default function Nav() {
  //   const [isActive, setIsActive] = useState(false);

  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="navbar">
      <div className="container">
        <Logo className="nav-logo" />

        {/* <button>
          <FaBars />
          <ThemeBtn />
        </button> */}

        <div className={`navbar-links`}>
          <Link href="/" {...(pathname === "/" && { className: "is-active" })}>
            Home
          </Link>
          <Link
            href="/anime-list"
            {...(pathname === "/anime-list" && { className: "is-active" })}
          >
            Anime List
          </Link>
          <Link
            href="/characters"
            {...(pathname === "/characters" && { className: "is-active" })}
          >
            Characters
          </Link>
          <Link
            href="/news"
            {...(pathname === "/news" && { className: "is-active" })}
          >
            News
          </Link>
          <Link
            href="/community"
            {...(pathname === "/community" && { className: "is-active" })}
          >
            Community
          </Link>
          <Link
            href="/about-us"
            {...(pathname === "/about-us" && { className: "is-active" })}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            {...(pathname === "/contact" && { className: "is-active" })}
          >
            Contact
          </Link>

          <ThemeBtn />
        </div>
      </div>
    </nav>
  );
}
