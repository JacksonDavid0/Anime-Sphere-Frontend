"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function VerifiedUser() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="verified">
      <div className="container">
        <Logo />

        <div className="header">
          <h1>Account Verified Successfully!</h1>
        </div>

        <div className="content">
          <p className="paragraph">
            Hi <span className="font-semibold text-orange-400">{user}</span>,
          </p>
          <p className="paragraph mb-6">
            Welcome to Anime Sphere! Your account is now active and ready to go.
            Start exploring and connecting with other anime fan and friends.
          </p>

          <p className="button-container">
            <Link href="/sign-in" className="button">
              Go to Anime Sphere
            </Link>
          </p>
        </div>

        <div className="footer">
          <p className="paragraph">
            Thank you,
            <br />
            The Anime Sphere Team
          </p>
          <p>
            <Link href="/">Visit Anime Sphere</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
