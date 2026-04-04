import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

const useSocket = () => {
  const [message, setMessage] = useState("");

  const joinRoom = (roomId: number) => {
    socket.emit("joinRoom", roomId);
  };

  const sendMessage = (roomId: number, message: string) => {
    socket.emit("sendMessage", { roomId, message });
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => setMessage(message));

    return () => {
      socket.off("receiveMessage", (message) => setMessage(message));
    };
  });

  return {
    joinRoom,
    sendMessage,
    message,
  };
};
export default useSocket;
