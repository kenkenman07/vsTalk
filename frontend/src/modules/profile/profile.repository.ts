import { supabase } from "../../lib/supabase";

export const profileRepository = {
  async createAndUpdate(userId: string, userName: string) {
    const { data, error } = await supabase
      .from("profile")
      .upsert({
        user_id: userId,
        display_name: userName,
      })
      .select()
      .single();

    if (error != null) throw new Error(error.message);

    return data;
  },
  async find(userId: string) {
    const { data, error } = await supabase
      .from("profile")
      .select()
      .eq("user_id", userId)
      .maybeSingle();

    if (error != null) throw new Error(error.message);
    return data;
  },
};
