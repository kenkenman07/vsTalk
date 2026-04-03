import { supabase } from "../../lib/supabase";

export const roomMemberRepository = {
  async create(roomId: number, userId: string, userName: string) {
    const { data, error } = await supabase
      .from("room_member")
      .insert({
        room_id: roomId,
        member_id: userId,
        member_name: userName,
      })
      .select()
      .single();

    if (error != null) throw new Error(error.message);
    return data;
  },

  async delete(roomId: number, userId: string) {
    const { data, error } = await supabase
      .from("room_member")
      .delete()
      .eq("room_id", roomId)
      .eq("member_id", userId);

    if (error != null) throw new Error(error.message);
    return data;
  },

  async find(roomId: number) {
    const { data, error } = await supabase
      .from("room_member")
      .select("*")
      .eq("room_id", roomId);

    if (error != null) throw new Error(error.message);
    return data;
  },
};
