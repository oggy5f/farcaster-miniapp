import "./globals.css"

export const metadata = {
  title: "Daily Check-In Mini App",
  description: "Farcaster Mini App",
  openGraph: {
    title: "Daily Check-In Mini App",
    description: "Farcaster Mini App",
    url: "https://farcaster-miniapp-iscc.vercel.app",
    images: [
      {
        url: "https://farcaster-miniapp-iscc.vercel.app/icon.png",
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:miniapp" content="true" />
      </head>
      <body>{children}</body>
    </html>
  )
}