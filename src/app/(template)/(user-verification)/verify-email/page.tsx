"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function Verfiy() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const message = searchParams.get("message");

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="verify">
      <div className="container">
        <Logo />

        <div className="header">
          <h1>Account Verified Successfully!</h1>
        </div>

        <div className="content">
          <p className="paragraph">
            Hi <span className="User">{user}</span>,
          </p>
          <p className="paragraph">{message}</p>

          <p className="button-container">
            <Link href="/sign-in" className="button">
              Sign in to Anime Sphere
            </Link>
          </p>
        </div>

        <div className="footer">
          <p className="paragraph">
            Thank you,
            <br />
            The Anime Sphere Team
          </p>
        </div>
      </div>
    </div>
  );
}
