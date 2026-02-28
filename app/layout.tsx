import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Check-In Mini App",
  description: "Daily check-in Farcaster Mini App",
  openGraph: {
    title: "Daily Check-In Mini App",
    description: "Daily check-in Farcaster Mini App",
    images: ["https://roanmini.xyz/icon.png"],
  },
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