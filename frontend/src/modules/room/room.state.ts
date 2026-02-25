import { atom, useAtom } from "jotai";

export type Room = {
  roomName: string;
  totalMinutes: number;
};

const roomAtom = atom<Room[]>([]);

export const useRoomStore = () => {
  const [room, setRoom] = useAtom(roomAtom);

  const set = (newRoom: Room) => {
    setRoom((oldRooms) => {
      const combineRooms = [...oldRooms, newRoom];

      return Object.values(combineRooms);
    });
  };

  return { room, set };
};
