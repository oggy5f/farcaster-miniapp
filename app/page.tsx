"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [fid, setFid] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        // 🔥 VERY IMPORTANT (Warpcast ke liye)
        await sdk.actions.ready();

        // 👇 Context safely load karo
        const context = await sdk.context;

        if (context?.user) {
          setFid(context.user.fid);
          setUsername(context.user.username ?? null);
        }
      } catch (error) {
        console.log("Browser me open hua hai ya SDK load nahi hua");
      }

      setReady(true);
    };

    init();
  }, []);

  if (!ready) {
    return (
      <div style={{ padding: 20 }}>
        Loading Mini App...
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Daily Check-In Mini App</h1>

      {fid ? (
        <>
          <p>Welcome, {username}</p>
          <p>Your FID: {fid}</p>
        </>
      ) : (
        <p>Warpcast ke andar open karo 👆</p>
      )}
    </div>
  );
}