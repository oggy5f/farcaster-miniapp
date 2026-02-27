"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [fid, setFid] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const sdkModule = await import("@farcaster/miniapp-sdk");
        const sdk: any = sdkModule.default;

        await sdk.actions.ready();

        sdk.on("context" as any, async (context: any) => {
          if (context?.user) {
            setFid(context.user.fid);
            setUsername(context.user.username);
            await loadPoints(context.user.fid);
          }
        });
      } catch (err) {
        console.log("Not inside Warpcast");
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function loadPoints(userFid: number) {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("fid", userFid)
      .single();

    if (data) {
      setPoints(data.points || 0);
    }

    setLoading(false);
  }

  async function handleCheckIn() {
    if (!fid) return;

    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("fid", fid)
      .single();

    if (!data) {
      await supabase.from("users").insert({
        fid,
        username,
        points: 10,
        last_checkin: today,
      });

      setPoints(10);
      return;
    }

    if (data.last_checkin === today) {
      alert("Already checked in today!");
      return;
    }

    const newPoints = (data.points || 0) + 10;

    await supabase
      .from("users")
      .update({
        points: newPoints,
        last_checkin: today,
      })
      .eq("fid", fid);

    setPoints(newPoints);
  }

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>🚀 Daily Check-In Mini App</h1>

      {username ? (
        <>
          <h2>Welcome @{username}</h2>
          <p>Your Points: {points}</p>

          <button
            onClick={handleCheckIn}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Check In (+10)
          </button>
        </>
      ) : (
        <p>Open inside Warpcast</p>
      )}
    </div>
  );
}