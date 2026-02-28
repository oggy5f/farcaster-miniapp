"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Daily Check-In Mini App</h1>
      <p>Warpcast ke andar open karo 👇</p>
    </div>
  );
}