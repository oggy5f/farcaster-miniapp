"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sdk } from "@farcaster/miniapp-sdk";

export default function Home() {

  const [user, setUser] = useState<any>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {

    const init = async () => {

      await sdk.actions.ready();

      const context = await sdk.context;

      const fcUser = context?.user;

      setUser(fcUser);

    };

    init();

  }, []);

  return (

    <main style={{ padding: 20 }}>

      <h2>Daily Check-In Mini App 🚀</h2>

      {user && (
        <>
          <p>FID: {user.fid}</p>
          <p>Username: {user.username}</p>
        </>
      )}

    </main>

  );

}