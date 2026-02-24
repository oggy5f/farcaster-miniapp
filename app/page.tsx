"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const sdk = await import("@farcaster/miniapp-sdk");
        const context = await sdk.context;

        if (context?.user?.fid) {
          setFid(context.user.fid);
          setUsername(context.user.username);
        }
      } catch (err) {
        console.log("Not inside Warpcast");
      }
    }

    load();
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🚀 My Real Farcaster Mini App</h1>

      {fid ? (
        <>
          <h2>Welcome @{username}</h2>
          <p>Your FID: {fid}</p>
        </>
      ) : (
        <p>Open this inside Warpcast Mini Apps</p>
      )}
    </div>
  );
}