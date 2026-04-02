import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { fid, username, displayName } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: existing } = await supabase
      .from("users")
      .select("*")
      .eq("fid", fid)
      .maybeSingle();

    if (!existing) {
      await supabase.from("users").insert({
        fid,
        username,
        display_name: displayName,
        points: 10,
        streak: 1,
        last_checkin: new Date().toISOString(),
      });

      return Response.json({ success: true, message: "First check-in" });
    }

    await supabase
      .from("users")
      .update({
        points: existing.points + 10,
        last_checkin: new Date().toISOString(),
      })
      .eq("fid", fid);

    return Response.json({ success: true, message: "Checked in" });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message });
  }
}