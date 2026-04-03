import { Hand } from "lucide-react";
import { useState } from "react";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";

const stopReasons = [
  "話の繰り返し",
  "話の脱線",
  "共通認識のズレ",
  "話のターンの独占",
];

const Meeting = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [isHover, setIsHover] = useState<number | null>(null);
  const roomInfoStore = useRoomInfoStore();

  if (!roomInfoStore) return;
  const members = roomInfoStore.roomInfo?.members;

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed top-10 right-20 flex flex-col gap-4">
          メンバー
          <ul className="">
            {members?.map((member) => {
              return <li key={member.member_id}>{member.member_name}</li>;
            })}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-80">
          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl font-bold">
              {roomInfoStore.roomInfo?.name}
            </div>

            <div>経過時間</div>
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="flex gap-6">
              {stopReasons.map((reason, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedReason(reason)}
                    onMouseEnter={() => setIsHover(i)}
                    onMouseLeave={() => setIsHover(null)}
                    className={`border rounded-2xl p-6 ${
                      selectedReason == reason &&
                      "bg-red-400 text-white font-bold"
                    } ${isHover == i && "bg-red-300 text-white font-bold"}`}
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
