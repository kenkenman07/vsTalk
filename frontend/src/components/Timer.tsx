import { useEffect, useState } from "react";


function Timer() {
    const [totalSeconds, seTotalSeconds] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            seTotalSeconds((pre) => pre + 1);
        }, 1000)

        return () => clearInterval(id);
    }, [])

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const format = (n: number) => String(n).padStart(2, "0");

    return (
        <div>
            <div className="border bg-linear-to-b from-zinc-900 via-zinc-800 to-zinc-700 shadow-[0_8px_20px_rgba(0,0,0,0.6)] text-red-400 w-60 h-60 rounded-full flex items-center justify-center mb-6 text-7xl font-digital">
            <div className="ml-2 mt-5">{format(minutes)}:{format(seconds)}</div>
            </div>

        </div>
    )
}
export default Timer;