import { supabase } from "../../lib/supabase";

export const roomMemberRepository = {
  async join(userId: string) {
    const { data, error } = await supabase
      .from("room_member")
      .insert({
        member_id: userId,
      })
      .select("*");

    if (error != null) throw new Error(error.message);
    return data;
  },
};
