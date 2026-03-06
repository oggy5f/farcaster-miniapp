"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {

  useEffect(() => {

    const loadContext = async () => {

      try {

        const context = await sdk.context;

        console.log("Farcaster context:", context);

      } catch (err) {

        console.log("Farcaster context error:", err);

      }

    };

    loadContext();

  }, []);

  return (

    <main style={{ padding: 40 }}>

      <h1>Farcaster Mini App Test</h1>

      <p>
        Open console to see Farcaster context
      </p>

    </main>

  );

}