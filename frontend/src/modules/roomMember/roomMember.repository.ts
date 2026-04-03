import { supabase } from "../../lib/supabase";

export const roomMemberRepository = {
  async create(roomId: number, userId: string) {
    const { data, error } = await supabase
      .from("room_member")
      .insert({
        room_id: roomId,
        member_id: userId,
      })
      .select()
      .single();

    if (error != null) throw new Error(error.message);
    return data;
  },
};
