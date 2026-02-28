"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {
  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
        console.log("Mini App Ready called");
      } catch (err) {
        console.error("SDK error:", err);
      }
    };

    init();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>🚀 Daily Check-In Mini App</h1>
      <p>Mini App Active</p>

      <button
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        ✅ Check In
      </button>
    </main>
  );
}