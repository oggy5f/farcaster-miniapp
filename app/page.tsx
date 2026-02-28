"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import sdk from "@farcaster/miniapp-sdk";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadContext = async () => {
      try {
        const context = await sdk.context;
        setFid(context.user.fid);
        await sdk.actions.ready();
      } catch (err) {
        console.error(err);
      }
    };

    loadContext();
  }, []);

  const handleCheckIn = async () => {
    if (!fid) return;

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("fid", fid)
      .single();

    const now = new Date();

    // New user
    if (!existingUser) {
      await supabase.from("users").insert({
        fid,
        points: 10,
        last_checkin: now,
      });

      setMessage("✅ First check-in! +10 points");
      return;
    }

    const lastCheck = new Date(existingUser.last_checkin);
    const diff = now.getTime() - lastCheck.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      setMessage("⛔ Already checked in today");
      return;
    }

    await supabase
      .from("users")
      .update({
        points: existingUser.points + 10,
        last_checkin: now,
      })
      .eq("fid", fid);

    setMessage("🔥 Daily check-in successful! +10 points");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>🚀 Daily Check-In Mini App</h1>

      <button
        onClick={handleCheckIn}
        style={{
          padding: "12px 20px",
          background: "purple",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        ✅ Check In
      </button>

      <p style={{ marginTop: 20 }}>{message}</p>
    </main>
  );
}