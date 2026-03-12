"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {

  const [user, setUser] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);

  useEffect(() => {

    const init = async () => {

      await sdk.actions.ready();

      const context = await sdk.context;

      const fcUser = context?.user;

      setUser(fcUser);

      if (!fcUser) return;

      // check user in database
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("fid", fcUser.fid)
        .single();

      if (!data) {

        // create user
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

    <main style={{ padding: 24 }}>

      <h1>Daily Check-In Mini App</h1>

      {!user && <p>Loading user...</p>}

      {user && (
        <>
          <p>FID: {user.fid}</p>
          <p>Username: {user.username}</p>
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