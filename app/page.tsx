"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    async function loadUser() {

      const fc = (window as any).farcaster;

      if (!fc) return;

      const context = await fc.getContext();

      const fid = context.user.fid;
      const username = context.user.username;
      const displayName = context.user.displayName;

      setUser({
        fid,
        username,
        displayName
      });

      // CHECK USER
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("fid", fid)
        .single();

      // INSERT USER IF NOT EXISTS
      if (!data) {

        await supabase.from("users").insert({
          fid: fid,
          username: username,
          display_name: displayName
        });

      }

    }

    loadUser();

  }, []);

  if (!user) return <div>Loading...</div>;

  return (

    <main style={{ padding: 20 }}>

      <h2>Daily Check-In Mini App 🚀</h2>

      <p>FID: {user.fid}</p>
      <p>Username: {user.username}</p>
      <p>Display Name: {user.displayName}</p>

    </main>

  );

}