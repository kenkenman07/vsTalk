import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { socket } from "../lib/socket";
import { useParticipantStore } from "../modules/participant/participant.state";
import { likesRepository } from "../modules/likes/likes.repository";
import FinishButton from "../components/Meeting/FinishButton";
import TimerSection from "../components/Meeting/TimerSection";
import ParticipantsSection from "../components/Meeting/ParticipantsSection";
import StopReasonSelection from "../components/Meeting/StopReasonSelection";
import StopModal from "../components/Meeting/StopModal";
import MeetingHeader from "../components/Meeting/MeetingHeader";
import ConnectionModal from "../components/Meeting/ConnectionModal";
import { roomRepository } from "../modules/room/room.repository";
import { AlertCircle } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function Meeting() {
  const [roomName, setRoomName] = useState("");
  const [createUserId, setCreateUserId] = useState("");

  const navigate = useNavigate();

  const currentUserStore = useCurrentUserStore();
  const user = currentUserStore.currentUser;
  const username = user?.user_metadata.name;
  const userId = user?.id;

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [showStopModal, setShowStopModal] = useState(false);
  const [stopTimeLeft, setStopTimeLeft] = useState(60);
  const [recvReason, setRecvReason] = useState<string>("");
  const participantStore = useParticipantStore();
  const { participant } = participantStore;
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [stopCount, setStopCount] = useState(0);

  const [isConnected, setIsConnected] = useState(true);
  const params = useParams();

  useEffect(() => {
    fetchroomData();
  }, []);

  const fetchroomData = async () => {
    const roomId = parseInt(params.roomId!);
    const room = await roomRepository.findOne(roomId);
    const roomName = room.room_name;
    const createUserId = room.create_user_id;
    const duration = room.total_minutes;
    const endsAtMs = new Date(room.endsAt).getTime();
    const timeLeft = Math.floor((endsAtMs - Date.now()) / 1000);
    const safeSec = Math.max(0, timeLeft);
    setRoomName(roomName!);
    setCreateUserId(createUserId);
    setDuration(duration!);
    setTimeLeft(safeSec);
  };

  useEffect(() => {
    if (!socket.connected) setIsConnected(false);
    else setIsConnected(true);

    socket.on("checkRoom", (users: { id: string; name: string }[]) => {
      participantStore.setUser(users);
      console.log(participantStore.participant);
    });

    socket.emit("room", {
      roomName,
      userId: user!.id,
      userName: user?.user_metadata.name,
    });

    socket.on("stop", (msg) => {
      setRecvReason(msg);
    });

    return () => {
      socket.off("checkRoom");
    };
  }, []);

  // タイマー
  useEffect(() => {
    if (!isRunning || !timeLeft || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev! <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev! - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const resumeMeeting = () => {
    setStopTimeLeft((prev) => {
      if (prev <= 1) {
        // 停止時間終了、会議再開
        setShowStopModal(false);
        setIsRunning(true);
        setSelectedReason("");
        return 60;
      }
      return prev - 1;
    });
  };

  // 会議を一時停止
  const handleStopMeeting = () => {
    if (!selectedReason) {
      alert("停止理由を選択してください");
      return;
    }

    setIsRunning(false);
    setShowStopModal(true);
    setStopCount((prev) => prev + 1);

    socket.emit("stop", selectedReason);

    setStopTimeLeft(60); // 1分間停止
  };

  // 会議を終了
  const handleFinishMeeting = async () => {
    setIsRunning(false);

    if (confirm("会議を終了しますか？")) {
      await Promise.all(
        participant.map((participant) =>
          likesRepository.update(participant.name, participant.likes)
        )
      );

      await roomRepository.delete(roomName);

      // 確認ダイアログ
      navigate(`/result/${roomName}/${stopCount}`);
    }
  };

  // 時間切れの処理
  useEffect(() => {
    if (timeLeft === 0) {
      alert("会議時間が終了しました");
      navigate(`/result/${roomName}/${stopCount}`);
    }
  }, [timeLeft]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {createUserId == userId && (
          <FinishButton onClick={handleFinishMeeting} />
        )}

        {/* Non-host message */}
        {createUserId != userId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                会議の終了はホストのみが実行できます
              </p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <MeetingHeader roomName={roomName} />

        <div className="grid lg:grid-cols-3 gap-6">
          <TimerSection
            duration={duration}
            timeLeft={timeLeft!}
            isRunning={isRunning}
            participant={participant}
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <ParticipantsSection participant={participant} />

            <StopReasonSelection
              showStopModal={showStopModal}
              resumeMeeting={resumeMeeting}
              selectedReason={selectedReason}
              onClickReason={setSelectedReason}
              onClickStop={handleStopMeeting}
            />
          </motion.div>
        </div>
      </div>

      <StopModal
        showStopModal={showStopModal}
        recvReason={recvReason}
        stopTimeLeft={stopTimeLeft}
      />

      <ConnectionModal isConnected={isConnected} roomName={roomName} />
    </div>
  );
}
