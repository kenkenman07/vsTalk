import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import ResultModal from "../components/ResultModal";
import Timer from "../components/Timer";


function Meeting() {
    const [ socket ] = useSocket();
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");
    const [flagForReload, setFlagForReload] = useState(false);

    const stop = () => {
        socket.emit("message", reason);
    }

    useEffect(() => {
        socket.on("message", (msg) => {
            console.log(msg);
            setMessage(msg);
            socket.disconnect();
        })

    }, []);

    const reload = () => {
        setMessage("");
        setFlagForReload((pre) => !pre);
        socket.connect();
        console.log(flagForReload);
    }


    return (
        <div>
            {message && <ResultModal message={message} onClose={reload}/>}
                
            <div className="fixed inset-0 flex flex-col items-center justify-center">

                {!message && <Timer />}

                <div>
                    <input 
                    type="radio"
                    id="radio-input1"
                    name="reason"
                    value="話の繰り返しが起きています"
                    onChange={(e) => {setReason(e.target.value)}}
                    checked={reason === '話の繰り返しが起きています'}
                    className="peer hidden"
                    />
                    <label htmlFor="radio-input1" className="relative mx-0 my-1 block w-90 cursor-pointer rounded-lg border-2 border-solid border-[#B9B9B9] px-12 py-2.5 text-sm delay-0 duration-500 ease-in-out before:invisible before:absolute before:left-[19px] before:top-2 before:h-5 before:w-5 before:scale-[3] before:rounded-full before:bg-black before:opacity-0 before:delay-0 before:duration-500 before:ease-in-out before:content-[''] after:absolute after:left-[21px] after:top-3 after:h-4 after:w-4 after:rounded-full after:border-2 after:border-solid after:border-black after:content-[''] peer-checked:border-black peer-checked:before:visible peer-checked:before:scale-100 peer-checked:before:opacity-100">
                        話の繰り返しが起きています
                    </label>
                </div>

                <div>
                    <input 
                    type="radio"
                    id="radio-input2"
                    name="reason"
                    value="話が脱線しています"
                    onChange={(e) => {setReason(e.target.value)}}
                    checked={reason === '話が脱線しています'}
                    className="peer hidden"
                    />
                    <label htmlFor="radio-input2" className="relative mx-0 my-1 block w-90 cursor-pointer rounded-lg border-2 border-solid border-[#B9B9B9] px-12 py-2.5 text-sm delay-0 duration-500 ease-in-out before:invisible before:absolute before:left-[19px] before:top-2 before:h-5 before:w-5 before:scale-[3] before:rounded-full before:bg-black before:opacity-0 before:delay-0 before:duration-500 before:ease-in-out before:content-[''] after:absolute after:left-[21px] after:top-3 after:h-4 after:w-4 after:rounded-full after:border-2 after:border-solid after:border-black after:content-[''] peer-checked:border-black peer-checked:before:visible peer-checked:before:scale-100 peer-checked:before:opacity-100">
                        話が脱線しています
                    </label>
                </div>

                <div>

                    <input 
                    type="radio"
                    id="radio-input3"
                    name="reason"
                    value="前の議事録を再確認してください"
                    onChange={(e) => {setReason(e.target.value)}}
                    checked={reason === '前の議事録を再確認してください'}
                    className="peer hidden"
                    />
                    <label htmlFor="radio-input3" className="relative mx-0 my-1 block w-90 cursor-pointer rounded-lg border-2 border-solid border-[#B9B9B9] px-12 py-2.5 text-sm delay-0 duration-500 ease-in-out before:invisible before:absolute before:left-[19px] before:top-2 before:h-5 before:w-5 before:scale-[3] before:rounded-full before:bg-black before:opacity-0 before:delay-0 before:duration-500 before:ease-in-out before:content-[''] after:absolute after:left-[21px] after:top-3 after:h-4 after:w-4 after:rounded-full after:border-2 after:border-solid after:border-black after:content-[''] peer-checked:border-black peer-checked:before:visible peer-checked:before:scale-100 peer-checked:before:opacity-100">
                        前の議事録を再確認してください
                    </label>
                </div>

                <div>

                    <input 
                    type="radio"
                    id="radio-input4"
                    name="reason"
                    value="話が長すぎます"
                    onChange={(e) => {setReason(e.target.value)}}
                    checked={reason === '話が長すぎます'}
                    className="peer hidden"
                    />
                    <label htmlFor="radio-input4" className="relative mx-0 my-1 block w-90 cursor-pointer rounded-lg border-2 border-solid border-[#B9B9B9] px-12 py-2.5 text-sm delay-0 duration-500 ease-in-out before:invisible before:absolute before:left-[19px] before:top-2 before:h-5 before:w-5 before:scale-[3] before:rounded-full before:bg-black before:opacity-0 before:delay-0 before:duration-500 before:ease-in-out before:content-[''] after:absolute after:left-[21px] after:top-3 after:h-4 after:w-4 after:rounded-full after:border-2 after:border-solid after:border-black after:content-[''] peer-checked:border-black peer-checked:before:visible peer-checked:before:scale-100 peer-checked:before:opacity-100">
                        話が長すぎます
                    </label>
                </div>
                
                <div>
                    <button
                        disabled={!reason}
                        onClick={stop}
                        className="w-24 h-24 rounded-full font-bold bg-red-600 hover:bg-red-700"
                        >
                        ボタン
                    </button>
                </div>

            </div>
        </div>        
    )

}
export default Meeting;