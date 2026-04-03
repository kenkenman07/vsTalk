import { supabase } from "../../lib/supabase";

export const roomsRepository = {
  async create(roomName: string) {
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        name: roomName,
      })
      .select()
      .single();

    if (error != null) throw new Error(error.message);
    return data;
  },

  async findAll() {
    const { data, error } = await supabase.from("rooms").select("*");
    if (error != null) throw new Error(error.message);

    return data;
  },

  async findOne(roomId: number) {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .eq("id", roomId)
      .single();
    if (error != null) throw new Error(error.message);

    return data;
  },

  async delete(roomId: number) {
    const { data, error } = await supabase
      .from("rooms")
      .delete()
      .eq("id", roomId);

    if (error != null) throw new Error(error.message);
    return data;
  },
};
