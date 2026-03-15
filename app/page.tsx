"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    async function init() {

      try {

        const fc = (window as any).farcaster;

        if (!fc) return;

        const context = await fc.getContext();

        // ✅ tell Warpcast app is ready
        await fc.actions.ready();

        const fid = context.user?.fid;
        const username = context.user?.username;
        const displayName = context.user?.displayName;

        setUser({
          fid,
          username,
          displayName
        });

        // check user
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("fid", fid)
          .single();

        // insert if not exists
        if (!data) {

          await supabase.from("users").insert({
            fid: fid,
            username: username,
            display_name: displayName
          });

        }

      } catch (err) {
        console.log("Mini app error:", err);
      }

    }

    init();

  }, []);

  if (!user) return <div style={{padding:20}}>Loading Mini App...</div>;

  return (

    <main style={{ padding: 20 }}>

      <h2>Daily Check-In Mini App 🚀</h2>

      <p>FID: {user.fid}</p>
      <p>Username: {user.username}</p>
      <p>Display Name: {user.displayName}</p>

    </main>

  );

}