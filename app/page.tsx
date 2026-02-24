"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const sdkModule: any = await import("@farcaster/miniapp-sdk");
        const sdk = sdkModule.default;

        await sdk.ready();

        const context = await sdk.getContext(); // IMPORTANT CHANGE

        if (context?.user?.fid) {
          setFid(context.user.fid);
          setUsername(context.user.username);
        }
      } catch (err) {
        console.log("Not inside Warpcast");
      }
    }

    init();
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
        <p>Loading Mini App...</p>
      )}
    </div>
  );
}