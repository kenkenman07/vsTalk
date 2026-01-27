import { useEffect, useState } from "react";


function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setTime((pre) => pre + 1);
        }, 1000)

        return () => clearInterval(id);
    }, [])

    return (
        <div>
            {time}秒

        </div>
    )
}
export default Timer;