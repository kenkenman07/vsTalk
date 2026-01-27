import { io, type Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

function useSocket() {
    const socketRef = useRef<Socket | null>(null);
    
    if(!socketRef.current) {
        socketRef.current = io('http://10.75.57.153:8000');
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