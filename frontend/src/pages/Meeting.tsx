import { Hand } from "lucide-react";
import { useState } from "react";

const stopReasons = [
  "話の繰り返し",
  "話の脱線",
  "共通認識のズレ",
  "話のターンの独占",
];

const Meeting = () => {
  const [selectedReason, setSelectedReason] = useState("");

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-40">
          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl font-bold">ルーム名</div>

            <div>経過時間</div>
          </div>

          <div className="flex flex-col items-center gap-7">
            <div className="flex gap-6">
              {stopReasons.map((reason, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedReason(reason)}
                    className=""
                  >
                    {reason}
                  </button>
                );
              })}
            </div>

            <div className="p-7 border rounded-full">
              <Hand />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-20 right-20">退出</div>
    </div>
  );
};
export default Meeting;
