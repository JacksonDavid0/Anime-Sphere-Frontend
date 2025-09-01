"use client";
import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function ExpiredPasswordLink() {
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="expired-password-link">
      <div className="container">
        <div className="card">
          <Logo />

          <div className="header">
            <h1 className="title">Password Reset Link Expired</h1>
          </div>

          <div className="content">
            <p className="paragraph">Hi {user},</p>
            <p className="error-message">
              The password reset link you used has expired or is no longer
              valid. For security reasons, password reset links are only active
              for a limited time.
            </p>

            <p className="paragraph">
              Don't worry! You can easily request a new password reset link.
              Please visit our "Forgot Password" page and enter your email
              address to receive a new link.
            </p>

            <p className="button-container">
              <Link href="/forget-Password" className="button">
                Request New Password Reset Link
              </Link>
            </p>

            <p className="paragraph">
              If you continue to experience issues, please contact our support
              team.
            </p>
          </div>

          <div className="footer">
            <p className="paragraph">
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
