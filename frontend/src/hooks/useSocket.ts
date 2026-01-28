import { io, type Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

function useSocket() {
    const socketRef = useRef<Socket | null>(null);

    const url = import.meta.env.VITE_SERVER_URL;
    
    if(!socketRef.current) {
        socketRef.current = io(url);
    }

    const socket = socketRef.current;
    
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        });

        return () => {
            socket.off("message");
        }
    }, [socket]);

    return [ socket ];

}
export default useSocket;