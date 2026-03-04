import { supabase } from "../../lib/supabase";

export const roomRepository = {
  async create(
    roomName: string,
    totalMinuts: number,
    createUserId: string,
    endsAt: string
  ) {
    const { data, error } = await supabase
      .from("room")
      .insert({
        room_name: roomName,
        total_minutes: totalMinuts,
        create_user_id: createUserId,
        endsAt: endsAt,
      })
      .select()
      .single();

    if (error != null) throw new Error(error.message);
    return data;
  },

  async find() {
    const { data, error } = await supabase.from("room").select("*");
    if (error != null) throw new Error(error.message);

    return data;
  },

  async findOne(roomId: number) {
    const { data, error } = await supabase
      .from("room")
      .select()
      .eq("id", roomId)
      .single();
    if (error != null) throw new Error(error.message);

    return data;
  },

  async delete(roomName: string) {
    const { error } = await supabase
      .from("room")
      .delete()
      .eq("room_name", roomName);
    if (error != null) throw new Error(error.message);
  },
};
