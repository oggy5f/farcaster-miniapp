"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const loadSDK = async () => {
      try {
        // Dynamically load Farcaster SDK
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@farcaster/miniapp-sdk/dist/index.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = async () => {
          const sdk = (window as any).farcaster;
          if (sdk?.actions?.ready) {
            await sdk.actions.ready();
            console.log("Mini App Ready called");
          }
        };
      } catch (err) {
        console.error("SDK load error:", err);
      }
    };

    loadSDK();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>🚀 Daily Check-In Mini App</h1>
      <p>Mini App Active</p>
    </main>
  );
}