"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      await sdk.actions.ready();

      const context = await sdk.context;

      const fid = context?.user?.fid?.toString();
      const username = context?.user?.username;
      const displayName = context?.user?.displayName;

      setUser({ fid, username, displayName });
    }

    init();
  }, []);

  async function handleCheckIn() {
    console.log("BUTTON CLICK"); // ✅ DEBUG

    setLoading(true);

    try {
      const res = await fetch("https://roanmini.xyz/api/checkin", {
        // ⚠️ IMPORTANT: full URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data); // ✅ DEBUG

      if (data.error) {
        alert("❌ " + data.error);
      } else {
        alert("✅ " + data.message);
      }
    } catch (err) {
      console.log("FETCH ERROR:", err); // ✅ DEBUG
      alert("❌ Network error");
    }

    setLoading(false);
  }

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <main style={{ padding: 20 }}>
      <h2>Daily Check-In Mini App 🚀</h2>
      <p>FID: {user.fid}</p>
      <p>Username: {user.username}</p>
      <p>Display Name: {user.displayName}</p>

      <button
        onClick={handleCheckIn}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          backgroundColor: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        {loading ? "Checking..." : "🔥 Daily Check-In"}
      </button>
    </main>
  );
}