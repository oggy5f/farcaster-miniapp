"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function init() {
      try {
        const sdkModule = await import("@farcaster/miniapp-sdk");
        const sdk: any = sdkModule.default;

        await sdk.actions.ready();

        // 🔥 Listen for context event
        sdk.on("context", (context: any) => {
          if (context?.user) {
            setUser(context.user);
          }
        });
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
        <p>Loading Mini App...</p>
      )}
    </div>
  );
}