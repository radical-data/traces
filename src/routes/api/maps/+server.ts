import { supabase } from "$lib/clients/supabaseClient";
import { json } from "@sveltejs/kit";

export const GET = async () => {
  try {
    const { data, error } = await supabase.from("maps").select("id, name");

    if (error) {
      console.error("Error fetching maps:", error);
      return json({ maps: [] });
    }

    return json({ maps: data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Unexpected error occurred" }, { status: 500 });
  }
};
