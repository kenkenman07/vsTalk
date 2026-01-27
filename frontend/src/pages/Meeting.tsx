import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";


function Meeting() {
    const [ socket ] = useSocket();
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");

    const stop = () => {
        socket.emit("message", reason);
    }

    useEffect(() => {
        socket.on("message", (msg) => {
            console.log(msg);
            setMessage(msg);
        })

    }, []);


    return (
        <div>
            <label>
                話の繰り返しが起きています
            </label>
                <input 
                    type="radio"
                    name="reason"
                    value="話の繰り返しが起きています"
                    onChange={(e) => setReason(e.target.value)}
                />

            <label>
                話が脱線しています
            </label>
                <input 
                    type="radio"
                    name="reason"
                    value="話が脱線しています"
                    onChange={(e) => setReason(e.target.value)}
                />

            <label>
                前の議事録を再確認してください
            </label>
                <input 
                    type="radio"
                    name="reason"
                    value="前の議事録を再確認してください"
                    onChange={(e) => setReason(e.target.value)}
                />
            
            <label>
                その他
            </label>
                <input 
                    name="reason"
                    placeholder="自由記述"
                    onChange={(e) => setReason(e.target.value)}
                />
            <div>
                <button
                    disabled={!reason}
                    onClick={stop}
                >
                    ボタン
                </button>
            </div>

            {message}
            
            
        </div>        
    )

}
export default Meeting;