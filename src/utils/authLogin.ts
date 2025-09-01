"use server";

type stateProps = {
  error?: { message: string };
  success: boolean;
};

export async function login(state: stateProps | undefined, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  if (!email || !password) {
    return {
      success: false,
      error: {
        message: "Please fill all fields",
      },
    };
  }

  const data = {
    email,
    password,
  };

  try {
    const url = "http://localhost:3010/api/v1/user/login";
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    if (response.username && response.email) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: {
          message:
            response.error.details.length !== 0
              ? response.error.details[0].message
              : response.error.message
              ? response.error.message
              : "Login failed. Please try again.",
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
