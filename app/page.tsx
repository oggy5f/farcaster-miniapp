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

      setUser({
        fid,
        username,
        displayName,
      });
    }

    init();
  }, []);

  async function handleCheckIn() {
    if (!user) return;

    setLoading(true);

    // 👉 check if user exists
    const { data: existing, error } = await supabase
      .from("users")
      .select("*")
      .eq("fid", user.fid);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!existing || existing.length === 0) {
      // 👉 INSERT
      const { error: insertError } = await supabase.from("users").insert({
        fid: user.fid,
        username: user.username,
        display_name: user.displayName,
        points: 10,
        streak: 1,
        last_checkin: new Date().toISOString(),
      });

      if (insertError) {
        alert(insertError.message);
      } else {
        alert("✅ First check-in! +10 points");
      }
    } else {
      // 👉 UPDATE
      const current = existing[0];
      const newPoints = (current.points || 0) + 10;

      const { error: updateError } = await supabase
        .from("users")
        .update({
          points: newPoints,
          last_checkin: new Date().toISOString(),
        })
        .eq("fid", user.fid);

      if (updateError) {
        alert(updateError.message);
      } else {
        alert("✅ Checked in! +10 points");
      }
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

      <button onClick={handleCheckIn} style={{ marginTop: 20 }}>
        {loading ? "Checking..." : "Daily Check-In"}
      </button>
    </main>
  );
}