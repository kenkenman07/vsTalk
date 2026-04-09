import { useEffect, useState } from "react";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";

const useElapsedTimer = () => {
  const roomInfoStore = useRoomInfoStore();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!roomInfoStore.roomInfo) {
    return { minutes: 0, seconds: 0 };
  }

  const start = new Date(roomInfoStore.roomInfo?.createdAt);
  const elapsedMs = Math.max(0, now.getTime() - start.getTime());

  const totalSec = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  return {
    minutes,
    seconds,
  };
};
export default useElapsedTimer;
