import { Hand, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";
import { roomService } from "../services/room/room.service";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { useNavigate, useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import useElapsedTimer from "../hooks/useElapsedTimer";
import Modal from "../components/Meeting/Modal";
import CauseOption from "../components/Meeting/CauseOption";

const Meeting = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [isHover, setIsHover] = useState<number | null>(null);

  const [modalMessage, setModalMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [modalTimer, setModalTimer] = useState(0);
  const roomInfoStore = useRoomInfoStore();
  const currentUserStore = useCurrentUserStore();
  const { joinRoom, sendMessage, sendExit, message, joinFlag } = useSocket();
  const navigate = useNavigate();
  const { minutes, seconds } = useElapsedTimer();
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

    sendExit(roomIdNum);

    navigate("/");
  };

  const stop = () => {
    if (!roomInfoStore.roomInfo) return;
    sendMessage(roomInfoStore.roomInfo.id, selectedReason);
    setSelectedReason("");
  };

  return (
    <div className="min-h-scren px-5 sm:px-6">
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed top-10 right-10 sm:top-20 sm:right-20 flex flex-col">
          <div className="relative flex flex-col items-center">
            <button onClick={() => setOpen((prev) => !prev)}>
              <Users size={32} />
            </button>

            {open ? (
              <div className="absolute w-24 h-48 sm:w-32 sm:h-72 rounded-2xl text-white gap-2 bg-gray-700 flex flex-col items-center">
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>

                <div className="flex-1 overflow-y-auto">
                  <ul className="">
                    {members?.map((member) => {
                      return (
                        <li key={member.member_id}>{member.member_name}</li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="w-full max-w-lg flex flex-col items-center gap-40">
          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl font-bold">
              {roomInfoStore.roomInfo?.name}
            </div>

            <div>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>

          {modalMessage ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 p-4">
              <Modal modalMessage={modalMessage} modalTimer={modalTimer} />
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col items-center gap-10">
            <CauseOption
              setSelectedReason={setSelectedReason}
              selectedReason={selectedReason}
              setIsHover={setIsHover}
              isHover={isHover}
            />

            <button onClick={stop} className="p-7 border rounded-full">
              <Hand />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleExit}
        className="z-10 fixed bottom-10 right-10 sm:bottom-20 sm:right-20 bg-red-500 font-medium rounded-2xl p-4"
      >
        退出
      </button>
    </div>
  );
};
export default Meeting;
