export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {

  const [user, setUser] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {

    const init = async () => {

      await sdk.actions.ready();

      const context = await sdk.context;

      const fcUser = context?.user;

      if (!fcUser) return;

      setUser(fcUser);

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("fid", fcUser.fid)
        .single();

      if (!data) {

        const { data: newUser } = await supabase
          .from("users")
          .insert({
            fid: fcUser.fid,
            username: fcUser.username,
            points: 0,
            streak: 0
          })
          .select()
          .single();

        setDbUser(newUser);

      } else {

        setDbUser(data);

      }

    };

    init();

  }, []);

  return (

    <main style={{ padding: 20 }}>

      <h2>Daily Check-In Mini App 🚀</h2>

      {!user && <p>Loading user...</p>}

      {user && (
        <>
          <p>FID: {user.fid}</p>
          <p>Username: {user.username}</p>
          <p>Display Name: {user.displayName}</p>
        </>
      )}

      {dbUser && (
        <>
          <p>Points: {dbUser.points}</p>
          <p>Streak: {dbUser.streak}</p>
        </>
      )}

    </main>

  );

}