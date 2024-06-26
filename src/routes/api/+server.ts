import { supabase } from "$lib/clients/supabaseClient";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const response = await request.json();

    const { data, error } = await supabase
      .from("data_submissions")
      .insert(response)
      .select();

    if (error) {
      console.error("Error submitting data:", error);
      return json({ error: "Error submitting data" }, { status: 500 });
    }

    return json({ map: data[0] }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return json({ error: "Unexpected error occurred" }, { status: 500 });
  }
};
