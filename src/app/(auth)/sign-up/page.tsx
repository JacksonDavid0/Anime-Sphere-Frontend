"use client";

import CustomInput from "@/components/input";
import Logo from "@/components/logo";
import { register } from "@/utils/authRegister";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const [state, action, ispending] = useActionState(register, undefined);

  useEffect(() => {
    if (state?.success === true) {
      router.push(
        `/verify-email?access=true&user=${state.data?.user}&message=${state.message}`
      );
    }
  });
  return (
    <div className="registerPage">
      <div className="registerCont">
        <Logo className="registerLogo" />
        <form className="registerForm" action={action}>
          <h2 className="registerText">Sign Up</h2>

          <CustomInput
            label="Username"
            type="text"
            name="username"
            placeholder="Enter your username"
          />

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

          <CustomInput
            label="Confirm Password"
            type="password"
            name="confirm-password"
            placeholder="Confirm your password"
          />

          <button className="btn">
            {ispending ? "Loading" : "Sign Up"}
          </button>
        </form>

        {state?.error ? (
          <p className="registerError">{state?.error?.message}</p>
        ) : (
          ""
        )}

        <p className="sign-inText">
          <span>Already have an account? </span>
          <Link href={"/sign-in"} className="sign-inLink">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
