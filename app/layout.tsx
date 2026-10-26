
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lazy Loopin | Watch the Loop",
  description:
    "Movie recommendations, original AI stories, and short-form cinema.",
  icons: {
    icon: [
      {
        url: "/lazy-loopin.ico?v=2",
        type: "image/x-icon",
        sizes: "any",
      },
    ],
    shortcut: "/lazy-loopin.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

