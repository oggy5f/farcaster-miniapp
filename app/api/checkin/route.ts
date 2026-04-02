import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  console.log("API HIT"); // ✅ DEBUG

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

    if (error) {
      console.log("FETCH ERROR:", error);
      throw error;
    }

    if (!existing) {
      const { error: insertError } = await supabase.from("users").insert({
        fid,
        username,
        display_name: displayName,
        points: 10,
        streak: 1,
        last_checkin: new Date().toISOString(),
      });

      if (insertError) {
        console.log("INSERT ERROR:", insertError);
        throw insertError;
      }

      return Response.json({ message: "First check-in success" });
    } else {
      const { error: updateError } = await supabase
        .from("users")
        .update({
          points: existing.points + 10,
          last_checkin: new Date().toISOString(),
        })
        .eq("fid", fid);

      if (updateError) {
        console.log("UPDATE ERROR:", updateError);
        throw updateError;
      }

      return Response.json({ message: "Daily check-in success" });
    }
  } catch (err: any) {
    console.log("FINAL ERROR:", err);
    return Response.json({ error: err.message });
  }
}