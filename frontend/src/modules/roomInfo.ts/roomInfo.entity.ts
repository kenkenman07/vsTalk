import type { RoomMember } from "../roomMember/roomMember.entity";
import type { Room } from "../rooms/rooms.entity";

export type RoomInfo = {
  id: Room["id"];
  name: Room["name"];
  members: {
    member_id: RoomMember["member_id"];
    member_name: RoomMember["member_name"];
  }[];
};
