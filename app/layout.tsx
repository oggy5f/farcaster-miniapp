import "./globals.css";

export const metadata = {
  title: "Daily Check-In Mini App",
  description: "Farcaster Mini App",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: "https://roanmini.xyz/icon.png",
      button: {
        title: "Open Mini App",
        action: {
          type: "launch_frame",
          name: "Daily Check-In Mini App",
          url: "https://roanmini.xyz",
          splashImageUrl: "https://roanmini.xyz/icon.png",
          splashBackgroundColor: "#000000"
        }
      }
    })
  }
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