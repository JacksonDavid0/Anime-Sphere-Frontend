"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function UserNotFound() {
  const searchParams = useSearchParams();

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="user-not-found">
      <div className="container">
        <div className="card">
          <Logo />

          <div className="header">
            <h1>User Not Found</h1>
          </div>

          <div className="content">
            <p className="paragraph">Hi there,</p>
            <p className="error-message">
              We're sorry, but the user account you are looking for does not
              exist or could not be found.
            </p>

            <p className="paragraph">
              This might be due to an incorrect username, the account being
              deleted, or a broken link.
            </p>

            <p className="button-container">
              <Link href="/sign-in" className="button">
                Go to Login Page
              </Link>
            </p>
            <p className="button-container">
              <Link href="/sign-up" className="secondary-button">
                Register a New Account
              </Link>
            </p>
          </div>

          <div className="footer">
            <p>
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
    </div>
  );
}
