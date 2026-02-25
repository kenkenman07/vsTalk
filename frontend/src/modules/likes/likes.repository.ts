import { supabase } from "../../lib/supabase";

export const likesRepository = {
  async insertUserRow(userId: string, userName: string) {
    const { data, error } = await supabase
      .from("likes")
      .upsert(
        {
          user_id: userId,
          user_name: userName,
          likes: 0,
        },
        { onConflict: "user_id" }
      )
      .select()
      .single();

    if (error != null) throw new Error(error.message);
    return data;
  },

  async update(userName: string, likes: number) {
    const { error } = await supabase.rpc("updatelikes", {
      amount: likes,
      username: userName,
    });
    if (error != null) throw new Error(error.message);
  },

  async find(userId: string) {
    const { data } = await supabase
      .from("likes")
      .select()
      .eq("user_id", userId)
      .single();
    return data;
  },
};
