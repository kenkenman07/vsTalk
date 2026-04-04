import { atom, useAtom } from "jotai";
import type { RoomInfo } from "./roomInfo.entity";

const roomInfoAtom = atom<RoomInfo | null>(null);

const useRoomInfoStore = () => {
  const [roomInfo, setRoomInfo] = useAtom(roomInfoAtom);

  return {
    roomInfo,
    set: setRoomInfo,
  };
};
export default useRoomInfoStore;
