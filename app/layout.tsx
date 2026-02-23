import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🚀 Farcaster Mini App",
  description: "Open inside Warpcast Mini Apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://farcaster-miniapp-beryl.vercel.app/icon.png"
        />
        <meta property="fc:frame:button:1" content="Open Mini App" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta
          property="fc:frame:button:1:target"
          content="https://farcaster-miniapp-beryl.vercel.app"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}