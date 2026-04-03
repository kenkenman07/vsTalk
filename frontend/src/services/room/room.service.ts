import { roomsRepository } from "../../modules/rooms/rooms.repository";

export const roomService = {
  async createRoom(roomName: string) {
    const room = await roomsRepository.create(roomName);
  },
};
