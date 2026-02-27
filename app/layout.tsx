import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Check-In Mini App",
  description: "Farcaster Daily Check-In",

  openGraph: {
    title: "Daily Check-In Mini App",
    description: "Open inside Warpcast",
    images: [
      {
        url: "https://farcaster-miniapp-beryl.vercel.app/icon.png",
      },
    ],
  },

  other: {
    "fc:frame": "vNext",
    "fc:frame:image":
      "https://farcaster-miniapp-beryl.vercel.app/icon.png",
    "fc:frame:button:1": "Open Mini App",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target":
      "https://farcaster-miniapp-beryl.vercel.app",
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