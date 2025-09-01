"use server";

type stateProps = {
  data?: object;
  error?: { message: string };
  success: boolean;
};

export async function forgetPassword(
  state: stateProps | undefined,
  formData: FormData
) {
  const email = formData.get("email");
  if (!email) {
    return {
      success: false,
      error: {
        message: "Please enter your email",
      },
    };
  }

  const data = {
    email,
  };

  try {
    const url = "http://localhost:3010/api/v1/user/forgot-Password";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());
    console.log(response);

    if (response.message) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: {
          message:
            response.error?.message ||
            "Failed to send reset link. Please try again.",
        },
      };
    }
  } catch {
    return {
      success: false,
      error: {
        message: "Please check your connection and try again.",
      },
    };
  }
}
