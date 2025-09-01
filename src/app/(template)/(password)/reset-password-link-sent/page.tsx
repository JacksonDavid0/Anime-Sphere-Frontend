"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";

export default function ResetPasswordLinkSent() {
  const searchParams = useSearchParams();
  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }
  return (
    <div className="reset-password-link">
      <div className="container">
        <Logo />

        <h1 className="title">Check Your Email</h1>
        <p>
          If the email address you provided is in our system, you will receive a
          password reset link shortly. Please check your inbox and your spam
          folder.
        </p>
        <div className="back-link">
          <Link href="/sign-in">Back to Log In</Link>
        </div>
      </div>
    </div>
  );
}
