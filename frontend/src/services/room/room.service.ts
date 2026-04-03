import type { RoomInfo } from "../../modules/roomInfo.ts/roomInfo.entity";
import { roomMemberRepository } from "../../modules/roomMember/roomMember.repository";
import { roomsRepository } from "../../modules/rooms/rooms.repository";

export const roomService = {
  async createRoom(
    roomName: string,
    userId: string,
    userName: string,
    setRoomInfo: (info: RoomInfo) => void,
  ) {
    const room = await roomsRepository.create(roomName);
    const roomIdAndUser = await roomMemberRepository.create(
      room.id,
      userId,
      userName,
    );

    setRoomInfo({
      id: room.id,
      name: room.name,
      members: [
        {
          member_id: roomIdAndUser.member_id,
          member_name: roomIdAndUser.member_name,
        },
      ],
    });

    return room.id;
  },
};
