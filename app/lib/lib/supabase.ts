import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://onyoxbwypaagvbklwylr.supabase.co";

const supabaseKey = "sb_publishable_XT_7PBV5qGW3OB9nn5jULQ_XsAnnrx9";

export const supabase = createClient(supabaseUrl, supabaseKey);