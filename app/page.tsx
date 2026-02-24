"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function init() {
      try {
        const sdkModule = await import("@farcaster/miniapp-sdk");
        const sdk: any = sdkModule.default;

        // Tell Warpcast app we're ready
        await sdk.actions.ready();

        // 🔥 Correct way in new SDK
        const context = sdk.context;

        if (context?.user) {
          setUser(context.user);
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

      {user ? (
        <>
          <h2>Welcome @{user.username}</h2>
          <p>Your FID: {user.fid}</p>
        </>
      ) : (
        <p>Waiting for Warpcast context...</p>
      )}
    </div>
  );
}