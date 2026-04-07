import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

const useSocket = () => {
  const [message, setMessage] = useState("");
  const [joinFlag, setJoinFlag] = useState(false);

  const joinRoom = (roomId: number) => {
    socket.emit("joinRoom", roomId);
  };

  const sendMessage = (roomId: number, message: string) => {
    socket.emit("sendMessage", { roomId, message });
  };

  const handleReceiveMessage = (message: string) => {
    setMessage(message);
  };

  const handleIndicateJoin = () => {
    () => setJoinFlag((pre) => !pre);
  };

  useEffect(() => {
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("indicateJoin", handleIndicateJoin);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("indicateJoin", handleIndicateJoin);
    };
  }, []);

  return {
    joinRoom,
    sendMessage,
    message,
    joinFlag,
  };
};
export default useSocket;
