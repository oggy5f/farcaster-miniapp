"use client";

import { useEffect, useState } from "react";
import sdk from "@farcaster/miniapp-sdk";

export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        await sdk.actions.ready();

        const context = await sdk.context;

        if (context && context.user) {
          setFid(context.user.fid ?? null);
          setUsername(context.user.username ?? null);
        }
      } catch (err) {
        console.log("Not inside Warpcast");
      }
    }

    init();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🚀 Farcaster Mini App</h1>

      {fid ? (
        <div>
          <p>✅ Connected inside Warpcast</p>
          <p><b>FID:</b> {fid}</p>
          <p><b>Username:</b> {username}</p>
        </div>
      ) : (
        <p>Open this inside Warpcast Mini Apps</p>
      )}
    </div>
  );
}