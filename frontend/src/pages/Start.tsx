import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
import HomeButton from "../components/HomeButton";
import RoomNameInput from "../components/Start/RoomNameInput";
import TimeSetting from "../components/Start/TimeSetting";
import CreateRoomButton from "../components/Start/CreateRoomButton";
import StartTitle from "../components/Start/StartTitle";
import { roomRepository } from "../modules/room/room.repository";
import { useCurrentUserStore } from "../modules/auth/current-user.state";

export default function Start() {
  const navigate = useNavigate();
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [roomName, setRoomName] = useState("");
  const { currentUser } = useCurrentUserStore();

  const handleCreateRoom = async () => {
    const totalMinutes: number = hours * 60 + minutes;
    const endsAt = new Date(
      Date.now() + totalMinutes * 60 * 1000
    ).toISOString();

    if (currentUser == null) return;
    const data = await roomRepository.create(
      roomName,
      totalMinutes,
      currentUser?.id,
      endsAt
    );

    const roomId = data.id;

    navigate(`/meeting/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-black to-teal-950 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <HomeButton />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <StartTitle />

          <RoomNameInput
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <TimeSetting
            hours={hours}
            onClickHoursPlus={() => setHours(Math.min(hours + 1, 12))}
            onClickHoursMinus={() => setHours(Math.max(hours - 1, 0))}
            minutes={minutes}
            onClickMinutesPlus={() => setMinutes((minutes + 15) % 60)}
            onClickMinutesMinus={() => setMinutes((minutes - 15 + 60) % 60)}
          />

          <CreateRoomButton onClick={handleCreateRoom} />

          {/* Info Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            設定した時間で会議ルームが作成されます
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
