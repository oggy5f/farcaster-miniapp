import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Daily Check-In Mini App</title>
        <meta name="description" content="Farcaster Mini App" />
        <meta name="fc:miniapp" content="true" />
      </head>
      <body>{children}</body>
    </html>
  );
}