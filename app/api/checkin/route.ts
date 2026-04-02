import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fid, username, displayName } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: existing, error } = await supabase
      .from("users")
      .select("*")
      .eq("fid", fid)
      .maybeSingle();

    if (error) throw error;

    if (!existing) {
      await supabase.from("users").insert({
        fid,
        username,
        display_name: displayName,
        points: 10,
        streak: 1,
        last_checkin: new Date().toISOString(),
      });

      return new Response(
        JSON.stringify({ success: true, message: "First check-in success" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("users")
      .update({
        points: existing.points + 10,
        last_checkin: new Date().toISOString(),
      })
      .eq("fid", fid);

    return new Response(
      JSON.stringify({ success: true, message: "Daily check-in success" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}