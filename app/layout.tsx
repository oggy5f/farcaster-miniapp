import "./globals.css";

export const metadata = {
  title: "Daily Check-In Mini App",
  description: "Daily check-in Farcaster Mini App",
  openGraph: {
    title: "Daily Check-In Mini App",
    description: "Daily check-in Farcaster Mini App",
    images: ["https://roanmini.xyz/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:miniapp" content="true" />
      </head>
      <body>{children}</body>
    </html>
  );
}