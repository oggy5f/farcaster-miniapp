"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function Home() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    async function init() {

      try {

        const sdk = (window as any).farcaster;

        if (!sdk) {
          console.log("Not inside Farcaster");
          return;
        }

        const context = await sdk.getContext();

        // important
        await sdk.actions.ready();

        const fid = context.user?.fid;
        const username = context.user?.username;
        const displayName = context.user?.displayName;

        setUser({
          fid,
          username,
          displayName
        });

        if (!fid) return;

        // check existing user
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("fid", fid)
          .single();

        // insert new user
        if (!data) {

          await supabase.from("users").insert({
            fid: fid,
            username: username,
            display_name: displayName
          });

        }

      } catch (err) {
        console.log("Mini App Error:", err);
      }

    }

    init();

  }, []);

  if (!user) return <div style={{padding:20}}>Loading...</div>;

  return (

    <main style={{ padding: 20 }}>

      <h2>Daily Check-In Mini App 🚀</h2>

      <p>FID: {user.fid}</p>
      <p>Username: {user.username}</p>
      <p>Display Name: {user.displayName}</p>

    </main>

  );

}