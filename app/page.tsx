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

        const waitForContext = (): Promise<any> =>
          new Promise((resolve) => {
            const interval = setInterval(() => {
              if (sdk.context?.user) {
                clearInterval(interval);
                resolve(sdk.context);
              }
            }, 100);
          });

        const context = await waitForContext();
        setUser(context.user);
      } catch (e) {
        console.log("Not in Warpcast");
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