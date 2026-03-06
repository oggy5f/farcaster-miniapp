"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {

  useEffect(() => {

    const init = async () => {

      try {

        const context = await sdk.context;

        console.log("Farcaster context:", context);

        // tell Warpcast app is ready
        await sdk.actions.ready();

      } catch (err) {

        console.log("SDK error:", err);

      }

    };

    init();

  }, []);

  return (

    <main style={{padding:40,fontFamily:"sans-serif"}}>

      <h1>Daily Check-In Mini App</h1>

      <p>Farcaster Mini App Loaded 🚀</p>

    </main>

  );

}