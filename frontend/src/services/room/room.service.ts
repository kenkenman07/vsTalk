import type { RoomInfo } from "../../modules/roomInfo.ts/roomInfo.entity";
import { roomMemberRepository } from "../../modules/roomMember/roomMember.repository";
import type { Room } from "../../modules/rooms/rooms.entity";
import { roomsRepository } from "../../modules/rooms/rooms.repository";
import type { RoomWithCount } from "../../pages/Join";

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
      createdAt: room.created_at,
      members: [
        {
          member_id: roomIdAndUser.member_id,
          member_name: roomIdAndUser.member_name,
        },
      ],
    });

    return room.id;
  },

  async joinRoom(
    roomId: number,
    roomName: string,
    createdAt: string,
    userId: string,
    userName: string,
    setRoomInfo: (info: RoomInfo) => void,
  ) {
    await roomMemberRepository.create(roomId, userId, userName);

    const roomIdAndUsers = await roomMemberRepository.find(roomId);

    setRoomInfo({
      id: roomId,
      name: roomName,
      createdAt: createdAt,
      members: roomIdAndUsers.map((member) => ({
        member_id: member.member_id ?? "",
        member_name: member.member_name ?? "",
      })),
    });
  },

  async getRoom(roomId: number, setRoomInfo: (info: RoomInfo) => void) {
    const roomData = await roomsRepository.findOne(roomId);
    const roomIdAndUsers = await roomMemberRepository.find(roomId);

    setRoomInfo({
      id: roomData.id,
      name: roomData.name,
      createdAt: roomData.created_at,
      members: roomIdAndUsers.map((member) => ({
        member_id: member.member_id ?? "",
        member_name: member.member_name ?? "",
      })),
    });
  },

  async exitRoom(
    roomId: number,
    userId: string,
    setRoomInfo: (info: RoomInfo | null) => void,
  ) {
    await roomMemberRepository.delete(roomId, userId);
    const roomData = await roomMemberRepository.find(roomId);
    setRoomInfo(null);
    if (roomData.length == 0) {
      await roomsRepository.delete(roomId);
    }
  },

  async getNameAndCount() {
    const rooms: Room[] = await roomsRepository.findAll();
    const roomsWithCount: RoomWithCount[] = await Promise.all(
      rooms.map(async (room) => {
        const count = await roomMemberRepository.count(room.id);

        return {
          room,
          memberCount: count ?? 0,
        };
      }),
    );

    return roomsWithCount;
  },
};
