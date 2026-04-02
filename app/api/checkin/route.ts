import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fid, username, displayName } = body;

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

      return Response.json({ message: "First check-in success" });
    } else {
      await supabase
        .from("users")
        .update({
          points: existing.points + 10,
          last_checkin: new Date().toISOString(),
        })
        .eq("fid", fid);

      return Response.json({ message: "Daily check-in success" });
    }
  } catch (err: any) {
    return Response.json({ error: err.message });
  }
}