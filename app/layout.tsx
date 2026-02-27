import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farcaster Mini App",
  description: "Daily Check-In Mini App",

  // 🔥 IMPORTANT FOR WARPCAST
  other: {
    "fc:miniapp": "true",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}