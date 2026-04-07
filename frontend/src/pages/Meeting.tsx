import { Hand } from "lucide-react";
import { useEffect, useState } from "react";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";
import { roomService } from "../services/room/room.service";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { useNavigate, useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";

const stopReasons = [
  "話の繰り返し",
  "話の脱線",
  "共通認識のズレ",
  "話のターンの独占",
];

const Meeting = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [isHover, setIsHover] = useState<number | null>(null);

  const [modalMessage, setModalMessage] = useState("");
  const [modalTimer, setModalTimer] = useState(0);
  const roomInfoStore = useRoomInfoStore();
  const currentUserStore = useCurrentUserStore();
  const { joinRoom, sendMessage, sendExit, message, joinFlag } = useSocket();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const { roomId } = useParams();
  const roomIdNum = Number(roomId);

  useEffect(() => {
    fetchRoom();
  }, [roomIdNum, joinFlag]);

  const fetchRoom = async () => {
    if (!roomIdNum) return;

    await roomService.getRoom(roomIdNum, roomInfoStore.set);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!message) return;

    setModalMessage(message);
    const timer = setInterval(() => {
      setModalTimer((prev) => {
        if (prev >= 4) {
          setModalMessage("");
          clearInterval(timer);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [message]);

  useEffect(() => {
    if (!roomIdNum) return;
    joinRoom(roomIdNum);
  }, [roomIdNum]);

  if (!roomInfoStore) return;
  const members = roomInfoStore.roomInfo?.members;

  const handleExit = async () => {
    if (!currentUserStore.currentUser) return;
    await roomService.exitRoom(
      roomInfoStore.roomInfo!.id,
      currentUserStore.currentUser?.id,
      roomInfoStore.set,
    );

    sendExit();

    navigate("/");
  };

  if (!roomInfoStore.roomInfo) return <div></div>;

  const start = new Date(roomInfoStore.roomInfo?.createdAt);
  const elapsedMs = Math.max(0, now.getTime() - start.getTime());

  const totalSec = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;

  const stop = () => {
    if (!roomInfoStore.roomInfo) return;
    sendMessage(roomInfoStore.roomInfo.id, selectedReason);
    setSelectedReason("");
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

            <div>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>

          {modalMessage ? (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="flex flex-col gap-3 items-center px-40 py-20 bg-yellow-300 shadow-md ">
                <div className="text-4xl font-bold">{modalMessage}</div>
                <div>{modalTimer}</div>
              </div>
            </div>
          ) : (
            <></>
          )}

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

            <button onClick={stop} className="p-7 border rounded-full">
              <Hand />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleExit}
        className="z-10 fixed bottom-20 right-20 bg-red-500 font-medium rounded-2xl p-4"
      >
        退出
      </button>
    </div>
  );
};
export default Meeting;
