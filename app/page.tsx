"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sdk } from "@farcaster/frame-sdk";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        // ✅ READY call (IMPORTANT)
        await sdk.actions.ready();

        const context = await sdk.context;

        const fid = context?.user?.fid;
        const username = context?.user?.username;
        const displayName = context?.user?.displayName;

        setUser({
          fid,
          username,
          displayName,
        });

        // ✅ Supabase
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        if (!fid) return;

        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("fid", fid)
          .single();

        if (!data) {
          await supabase.from("users").insert({
            fid,
            username,
            display_name: displayName,
          });
        }
      } catch (err: any) {
        console.log(err);
        setError(err.message);
      }
    }

    init();
  }, []);

  if (error) return <div style={{ padding: 20 }}>Error: {error}</div>;

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <main style={{ padding: 20 }}>
      <h2>Daily Check-In Mini App 🚀</h2>
      <p>FID: {user.fid}</p>
      <p>Username: {user.username}</p>
      <p>Display Name: {user.displayName}</p>
    </main>
  );
}