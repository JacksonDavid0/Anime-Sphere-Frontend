"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function ExpiredVerification() {
  const searchParams = useSearchParams();

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="expired-verification">
      <div className="container">
        <div className="card">
          <Logo />

          <div className="header">
            <h1>Account Activation Link Expired</h1>
          </div>

          <div className="content">
            <p className="warning">
              It looks like your account activation link has expired. Activation
              links are only valid for a limited time for security reasons.
            </p>

            <p>
              Don't worry! You can request a new activation link by registering
              again. We apologize for any inconvenience.
            </p>

            <p className="cta-button-container">
              <Link href="/sign-up" className="button">
                Go to Registration
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
