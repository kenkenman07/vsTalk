import { Hand } from "lucide-react";
import { useState } from "react";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";
import { roomService } from "../services/room/room.service";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { useNavigate } from "react-router-dom";

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
  const currentUserStore = useCurrentUserStore();
  const navigate = useNavigate();

  if (!roomInfoStore) return;
  const members = roomInfoStore.roomInfo?.members;

  const handleExit = async () => {
    if (!currentUserStore.currentUser) return;
    await roomService.exitRoom(
      roomInfoStore.roomInfo!.id,
      currentUserStore.currentUser?.id
    );

    navigate("/");
  };

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
      <button
        onClick={handleExit}
        className="fixed bottom-20 right-20 border rounded-2xl p-3"
      >
        退出
      </button>
    </div>
  );
};
export default Meeting;
