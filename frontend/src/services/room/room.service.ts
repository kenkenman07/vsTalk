import type { RoomInfo } from "../../modules/roomInfo.ts/roomInfo.entity";
import { roomMemberRepository } from "../../modules/roomMember/roomMember.repository";
import { roomsRepository } from "../../modules/rooms/rooms.repository";

export const roomService = {
  async createRoom(
    roomName: string,
    userId: string,
    setRoomInfo: (info: RoomInfo) => void
  ) {
    const room = await roomsRepository.create(roomName);
    const roomIdAndUserId = await roomMemberRepository.create(room.id, userId);

    setRoomInfo({
      id: room.id,
      name: room.name,
      member_id: [roomIdAndUserId.member_id],
    });

    return room.id;
  },
};
