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

      console.log("USER:", fid, username);

      setUser({ fid, username, displayName });
    }

    init();
  }, []);

  async function handleCheckIn() {
    if (!user) {
      alert("User not loaded");
      return;
    }

    setLoading(true);

    try {
      console.log("Checking user in DB...");

      const { data: existing, error } = await supabase
        .from("users")
        .select("*")
        .eq("fid", user.fid)
        .maybeSingle();

      console.log("Existing:", existing);
      if (error) {
        console.log("ERROR FETCH:", error);
        throw error;
      }

      if (!existing) {
        console.log("Creating new user...");

        const { error: insertError } = await supabase
          .from("users")
          .insert({
            fid: user.fid,
            username: user.username,
            display_name: user.displayName,
            points: 10,
            streak: 1,
            last_checkin: new Date().toISOString(),
          });

        if (insertError) {
          console.log("INSERT ERROR:", insertError);
          throw insertError;
        }

        alert("✅ First check-in success!");
      } else {
        console.log("Updating user...");

        const { error: updateError } = await supabase
          .from("users")
          .update({
            points: existing.points + 10,
            last_checkin: new Date().toISOString(),
          })
          .eq("fid", user.fid);

        if (updateError) {
          console.log("UPDATE ERROR:", updateError);
          throw updateError;
        }

        alert("✅ Daily check-in success!");
      }
    } catch (err: any) {
      console.log("FINAL ERROR:", err);
      alert("❌ ERROR: " + err.message);
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
          fontSize: "16px",
        }}
      >
        {loading ? "Checking..." : "🔥 Daily Check-In"}
      </button>
    </main>
  );
}