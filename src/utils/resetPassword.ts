"use server";

type stateProps = {
  error?: { message: string };
  message?: string;
  success: boolean;
};

export async function resetPassword(
  user: string,
  token: string,
  state: stateProps | undefined,
  formData: FormData
) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!password || !confirmPassword) {
    return {
      success: false,
      error: {
        message: "Please fill all fields",
      },
    };
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      error: {
        message: "Passwords do not match",
      },
    };
  }

  const data = {
    password,
  };

  try {
    const urlData = `http://127.0.0.1:3010/api/v1/user/reset-password/signature=${user}&${token}`;
    const response = await fetch(urlData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: {
          message:
            responseData.error?.message ||
            "Failed to reset password. Please try again.",
        },
      };
    } else {
      return {
        success: true,
        message: responseData,
      };
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      success: false,
      error: {
        message: "Please check your connection and try again.",
      },
    };
  }
}
