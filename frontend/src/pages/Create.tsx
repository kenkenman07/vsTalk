import { Link, useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { roomService } from "../services/room/room.service";
import { useState } from "react";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";
import { ArrowLeftToLine } from "lucide-react";

export default function Create() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUserStore();
  const [roomName, setRoomName] = useState<string>("");
  const roomInfoStore = useRoomInfoStore();

  const handleCreateRoom = async () => {
    if (currentUser == null) return;

    const roomId = await roomService.createRoom(
      roomName,
      currentUser.id,
      currentUser.user_metadata.name,
      roomInfoStore.set,
    );

    navigate(`/meeting/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-7 sm:px-6">
      <Link
        to="/"
        className="fixed left-7 top-6 sm:left-20 sm:top-10 flex gap-2"
      >
        <ArrowLeftToLine />
        戻る
      </Link>

      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center border rounded-lg gap-40 p-6 bg-white shadow-md">
          <h1 className="text-2xl font-bold">ルーム作成</h1>

          <div className="flex flex-col items-center gap-14 ">
            <label className="flex flex-col">
              ルーム名
              <input
                placeholder="ルーム名を入力"
                type="text"
                onChange={(e) => setRoomName(e.target.value)}
                className="px-8 py-4 border rounded-2xl bg-gray-200 placeholder-gray-900 "
              />
            </label>

            <button
              onClick={handleCreateRoom}
              className="rounded-lg border bg-red-500 font-medium p-5"
            >
              作成ボタン
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
