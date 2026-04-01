"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function init() {
      await sdk.actions.ready();

      const context = await sdk.context;

      const fid = Number(context?.user?.fid);
      const username = context?.user?.username;
      const displayName = context?.user?.displayName;

      setUser({ fid, username, displayName });
    }

    init();
  }, []);

  async function handleCheckIn() {
    if (!user) return;

    setLoading(true);

    try {
      const { data: existing, error } = await supabase
        .from("users")
        .select("*")
        .eq("fid", user.fid)
        .maybeSingle();

      if (error) throw error;

      if (!existing) {
        await supabase.from("users").insert({
          fid: user.fid,
          username: user.username,
          display_name: user.displayName,
          points: 10,
          streak: 1,
          last_checkin: new Date().toISOString(),
        });

        alert("✅ First check-in!");
      } else {
        await supabase
          .from("users")
          .update({
            points: existing.points + 10,
            last_checkin: new Date().toISOString(),
          })
          .eq("fid", user.fid);

        alert("✅ Checked in!");
      }
    } catch (err: any) {
      alert("❌ " + err.message);
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

      {/* 🔥 FIXED BUTTON */}
      <button
        onClick={handleCheckIn}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          backgroundColor: "#6366f1",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Checking..." : "🔥 Daily Check-In"}
      </button>
    </main>
  );
}