"use client";

import CustomInput from "@/components/input";
import { resetPassword } from "@/utils/resetPassword";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const token = searchParams.get("token");

  if (!user || !token) {
    notFound();
  }

  const [state, action, ispending] = useActionState(
    resetPassword.bind(null, user, token),
    undefined
  );

  const hasAccess = searchParams.get("access") === "true";

  if (!hasAccess) {
    notFound();
  }

  useEffect(() => {
    if (state?.success === true) {
      router.push(
        `/successfully-reset-password?access=true&user=${state.message[1]}`
      );
    }
  }, [state, router]);

  return (
    <div className="reset-password">
      <div className="container-holder">
        <div className="card">
          <div className="header-text">
            <h1>Set Your New Password</h1>
            <p>Please enter your new password below.</p>
          </div>

          <form id="passwordResetForm" action={action}>
            <CustomInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirm-password"
              placeholder="Enter your password"
            />

            <button
              className="submit-button"
              disabled={ispending}
              type="submit"
            >
              {ispending ? "Loading" : "Reset Password"}
            </button>
          </form>

          {state?.error && (
            <p className="error-message">{state.error.message}</p>
          )}

          <div className="footer">
            <p>
              Thank you,
              <br />
              The Anime Sphere Team
            </p>
            <p>
              <Link href="/" className="text-gray-400 hover:underline">
                Visit Anime Sphere
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
