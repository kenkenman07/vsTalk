import { atom, useAtom } from "jotai";
import type { RoomInfo } from "./roomInfo.entity";

const roomInfoAtom = atom<RoomInfo | null>();

const useRoomInfoStore = () => {
  const [roomInfo, setRoomInfo] = useAtom(roomInfoAtom);

  const addMember = () => {};

  return {
    roomInfo,
    set: setRoomInfo,
    addMember,
  };
};
export default useRoomInfoStore;
