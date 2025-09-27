"use server";
export type stateProps = {
  data?: object;
  error?: { message: string };
  message?: string;
  success: boolean;
};

export async function register(
  state: stateProps | undefined,
  formData: FormData
) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!username || !email || !password || !confirmPassword) {
    return {
      success: false,
      error: {
        message: "Please fill all fields",
      },
    };
  } else if (password !== confirmPassword) {
    return {
      success: false,
      error: {
        message: "Password do not match",
      },
    };
  }

  const data = {
    username,
    email,
    password,
  };

  try {
    const url = "http://localhost:3010/api/v1/user/register";
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    if (response.Data && response.Message) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        data: response.Data,
        message: response.Message,
      };
    } else {
      console.log(response);

      return {
        success: false,
        error: {
          message:
            response.error.details.length !== 0
              ? response.error.details[0].message
              : response.error.message
              ? response.error.message
              : "Registration failed. Please try again.",
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
