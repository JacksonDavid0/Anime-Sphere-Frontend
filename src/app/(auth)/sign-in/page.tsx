"use client";

import CustomInput from "@/components/input";
import Logo from "@/components/logo";
import { login } from "@/utils/authLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [state, action, ispending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push("/");
    }
  }, [state, router]);
  return (
    <div className="loginPage">
      <div className="loginCont">
        <Logo className="loginLogo" />
        <form className="loginForm" action={action}>
          <h2 className="loginText">Sign In</h2>

          <CustomInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
          />

          <button className="loginBtn">
            {ispending ? "Loading" : "Sign In"}
          </button>
        </form>

        {state?.error ? (
          <p className="loginError">{state?.error?.message}</p>
        ) : (
          ""
        )}

        <Link href={"/forgotten-password"} className="forget-password">
          Forgot Password?
        </Link>

        <p className="sign-upText">
          <span>Don't have an account? </span>
          <Link href={"/sign-up"} className="sign-upLink">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
