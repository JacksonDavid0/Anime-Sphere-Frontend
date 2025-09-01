import type { Metadata } from "next";
import "../scss/index.scss";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Anime Sphere",
  description: "Website for anime lovers and fans",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <html lang="en" className={theme === "dark" ? "dark-mode" : ""}>
      <body>{children}</body>
    </html>
  );
}
