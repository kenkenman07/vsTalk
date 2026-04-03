import JoinTitle from "../components/Join/JoinTitle";
import HomeButton from "../components/HomeButton";
import RoomList from "../components/Join/RoomList";
import CreateRoomLink from "../components/Join/CreateRoomLink";
import { roomRepository } from "../modules/rooms/room.repository";
import { useEffect, useState } from "react";
import type { Room } from "../modules/rooms/room.entity";

export default function Join() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const rooms = await roomRepository.find();
    if (rooms == null) return;
    setRooms(rooms);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-indigo-950 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <HomeButton />

        <JoinTitle />

        <RoomList rooms={rooms} />

        {/* Create Room Link */}
        <CreateRoomLink />
      </div>
    </div>
  );
}
