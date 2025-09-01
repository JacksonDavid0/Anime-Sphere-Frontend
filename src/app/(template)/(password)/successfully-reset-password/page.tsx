"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function SuccessfullyResetPassword() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="successfully-reset-password">
      <div className="container">
        <div className="card">
          <Logo />

          <div className="header">
            <h1>Password Successfully Reset!</h1>
          </div>

          <div className="content">
            <p className="paragraph">Hi {user},</p>
            <p className="success-message">
              Your password for Anime Sphere has been successfully reset. You
              can now log in with your new password.
            </p>

            <p className="button-container">
              <Link href="/sign-in" className="button">
                Log In Now
              </Link>
            </p>

            <p className="paragraph">
              If you did not initiate this password change, please contact our
              support team immediately.
            </p>
          </div>

          <div className="footer">
            <p>
              Thank you,
              <br />
              The Anime Sphere Team
            </p>
            <p>
              <Link href="/" className="footer-link">
                Visit Anime Sphere
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
