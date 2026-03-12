"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const init = async () => {

      try {

        // tell Warpcast app is ready
        await sdk.actions.ready();

        // get Farcaster context
        const context = await sdk.context;

        console.log("Farcaster context:", context);

        setUser(context?.user);

      } catch (err) {

        console.error("Mini App SDK error:", err);

      }

    };

    init();

  }, []);

  return (

    <main style={{ padding: 24, fontFamily: "sans-serif" }}>

      <h1>Daily Check-In Mini App</h1>

      {!user && <p>Loading Farcaster user...</p>}

      {user && (
        <>
          <p>FID: {user.fid}</p>
          <p>Username: {user.username}</p>
          <p>Display Name: {user.displayName}</p>
          <p>
  Wallet: {user.custodyAddress || user.verifiedAddresses?.ethAddresses?.[0] || "Not available"}
</p>
        </>
      )}

    </main>

  );

}