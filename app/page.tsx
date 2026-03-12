"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { supabase } from "@/lib/supabase";

export default function Home() {

  const [fcUser, setFcUser] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);

  useEffect(() => {

    const init = async () => {

      try {

        await sdk.actions.ready();

        const context = await sdk.context;

        const user = context?.user;

        if (!user) return;

        setFcUser(user);

        // check user in database
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("fid", user.fid)
          .single();

        if (!data) {

          // create user
          const { data: newUser } = await supabase
            .from("users")
            .insert({
              fid: user.fid,
              username: user.username,
              points: 0,
              streak: 0
            })
            .select()
            .single();

          setDbUser(newUser);

        } else {

          setDbUser(data);

        }

      } catch (error) {

        console.log("Error loading user", error);

      }

    };

    init();

  }, []);

  return (

    <main style={{ padding: 24 }}>

      <h1>Daily Check-In Mini App 🚀</h1>

      {!fcUser && <p>Loading Farcaster user...</p>}

      {fcUser && (
        <>
          <p>FID: {fcUser.fid}</p>
          <p>Username: {fcUser.username}</p>
          <p>Display Name: {fcUser.displayName}</p>
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