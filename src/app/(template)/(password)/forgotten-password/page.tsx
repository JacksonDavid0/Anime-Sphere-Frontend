"use client";
import CustomInput from "@/components/input";
import Logo from "@/components/logo";
import { forgetPassword } from "@/utils/forgetPassword";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function ForgottenPassword() {
  const router = useRouter();
  const [state, action, ispending] = useActionState(forgetPassword, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push(`/reset-password-link-sent?access=true`);
    }
  });

  return (
    <div className="forgotten-password">
      <div className="container">
        <Logo />

        <h1 className="title">Forgot Password?</h1>
        <p>
          Enter the email address you used to register. We'll send you an email
          with a link to reset your password.
        </p>

        {state?.error && <p className="error-message">{state.error.message}</p>}

        <form id="forgot-password-form" action={action}>
          <CustomInput label="Email" type="email" name="email" />
          <button type="submit" disabled={ispending}>
            {ispending ? "Loading.." : "Reset Password"}
          </button>
        </form>
        <div className="back-link">
          Remember your password? <Link href="/sign-in">Log In</Link>
        </div>
      </div>
    </div>
  );
}
