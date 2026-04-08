import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Room } from "../modules/rooms/rooms.entity";
import { roomService } from "../services/room/room.service";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import useRoomInfoStore from "../modules/roomInfo.ts/roomInfo.state";

export type RoomWithCount = { room: Room; memberCount: number };

const Join = () => {
  const [rooms, setRooms] = useState<RoomWithCount[]>([]);
  const { currentUser } = useCurrentUserStore();
  const roomInfoStore = useRoomInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    const rooms: RoomWithCount[] = await roomService.getNameAndCount();
    setRooms(rooms);
  };

  const handleJoin = async (room: Room) => {
    if (!currentUser) return;
    await roomService.joinRoom(
      room.id,
      room.name,
      room.created_at,
      currentUser.id,
      currentUser.user_metadata.name,
      roomInfoStore.set,
    );

    navigate(`/meeting/${room.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-7 sm:px-6">
      <Link to="/" className="fixed left-7 top-6 sm:left-20 sm:top-10">
        戻るボタン
      </Link>

      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center border min-h-48 px-4 py-8 sm:px-8 rounded-lg gap-14 bg-white shadow-md">
          <h1 className="text-2xl font-bold">ルーム参加</h1>

          <div className="flex flex-col gap-4">
            {rooms.length > 0 ? (
              rooms.map((room, i) => {
                return (
                  <div
                    key={i}
                    className="flex gap-3 items-center bg-gray-500 px-7 py-3 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">
                        {room.room.name}
                      </span>
                      <span className="text-xl">({room.memberCount})</span>
                    </div>
                    <button
                      onClick={() => handleJoin(room.room)}
                      className="px-4 py-2 bg-red-500 rounded-2xl"
                    >
                      参加
                    </button>
                  </div>
                );
              })
            ) : (
              <div>ルームがありません</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Join;
