import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  StopCircle,
  ThumbsUp,
  Users,
  Clock,
  AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { useCurrentUserStore } from "../modules/auth/current-user.state";
import { socket } from "../lib/socket";
import { useParticipantStore } from "../modules/participant/participant.state";
import { likesRepository } from "../modules/likes/likes.repository";

const STOP_REASONS = [
  "話の繰り返し",
  "話の脱線",
  "前の議事録を再確認してください",
  "話が長すぎます",
];

export default function Meeting() {
  const params = useParams();
  const navigate = useNavigate();
  const roomName = params.roomName;
  const duration = parseInt(params.duration!);
  const currentUserStore = useCurrentUserStore();
  const user = currentUserStore.currentUser;
  const username = user?.user_metadata.name;

  const [timeLeft, setTimeLeft] = useState(duration * 60); // 秒に変換
  const [isRunning, setIsRunning] = useState(true);
  const [stopCount, setStopCount] = useState(0);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [showStopModal, setShowStopModal] = useState(false);
  const [stopTimeLeft, setStopTimeLeft] = useState(60); // 停止時間（秒）
  const [recvReason, setRecvReason] = useState<string>("");
  const participantStore = useParticipantStore();
  const { participant } = participantStore;

  //socket
  useEffect(() => {
    socket.on("checkRoom", (usersName: string[]) => {
      participantStore.setUser(usersName);
      console.log(participantStore.participant);
    });

    socket.emit("room", { roomName, username });

    socket.on("stop", (msg) => {
      setRecvReason(msg);
    });

    return () => {
      socket.off("checkRoom");
    };
  }, []);

  // タイマー
  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // 停止モーダルのタイマー
  useEffect(() => {
    if (!showStopModal) return;

    const timer = setInterval(() => {
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
    }, 1000);
    return () => clearInterval(timer);
  }, [showStopModal]);

  // 時間のフォーマット
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // いいねボタン
  const handleLike = (participantName: string) => {
    participantStore.setLike(participantName);
  };

  // 会議を一時停止
  const handlePauseMeeting = () => {
    if (!selectedReason) {
      alert("停止理由を選択してください");
      return;
    }

    setIsRunning(false);
    setStopCount((prev) => prev + 1);
    setShowStopModal(true);

    socket.emit("stop", selectedReason);

    setStopTimeLeft(60); // 1分間停止
  };

  // 会議を終了
  const handleStopMeeting = async () => {
    setIsRunning(false);

    if (confirm("会議を終了しますか？")) {
      await Promise.all(
        participant.map((participant) =>
          likesRepository.update(participant.name, participant.likes)
        )
      );
      // 確認ダイアログ
      navigate("/result");
    }
  };

  // 時間切れの処理
  useEffect(() => {
    if (timeLeft === 0) {
      alert("会議時間が終了しました");
    }
  }, [timeLeft]);

  // 進捗率の計算
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Stop Meeting Button - Prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <button
            onClick={handleStopMeeting}
            className="group relative px-12 py-5 rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:shadow-[0_0_60px_rgba(239,68,68,0.6)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-pink-500 animate-pulse"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
            <span className="relative flex items-center gap-3 text-white text-xl font-bold">
              <StopCircle className="w-7 h-7" fill="currentColor" />
              会議を終了する
            </span>
          </button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>ホーム</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {roomName}
            </h1>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-8">
              <div className="flex items-center gap-2 mb-6 text-gray-300">
                <Clock className="w-5 h-5" />
                <span className="text-sm">残り時間</span>
              </div>

              {/* Timer Display */}
              <div className="text-center mb-8">
                <div className="relative inline-flex items-center justify-center w-48 h-48 mb-4">
                  {/* Progress Circle Background */}
                  <svg className="absolute w-full h-full -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 88 * (1 - progress / 100)
                      }`}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Timer Text */}
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    {formatTime(timeLeft)}
                  </div>
                </div>

                {/* Status */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isRunning ? "bg-green-400 animate-pulse" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {isRunning ? "進行中" : "停止中"}
                  </span>
                </div>
              </div>

              {/* Meeting Info */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">開始時刻</span>
                  <span className="text-white">
                    {new Date().toLocaleTimeString("ja-JP", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">予定時間</span>
                  <span className="text-white">{duration}分</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">参加者</span>
                  <span className="text-white">
                    {participantStore.participant?.length}人
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Participants Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6 text-gray-300">
                <Users className="w-5 h-5" />
                <span className="text-lg">参加者</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {participant?.map((participant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {participant.name.charAt(0)}
                        </div>
                        {/* Online Status */}
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
                      </div>

                      {/* Name */}
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-lg">
                          {participant.name}
                        </h3>
                        <p className="text-gray-400 text-sm">オンライン</p>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(participant.name)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group/like"
                    >
                      <ThumbsUp className="w-5 h-5 text-pink-400 group-hover/like:scale-125 transition-transform" />
                      <span className="text-white font-medium">
                        {participant.likes}
                      </span>
                      <span className="text-gray-400 text-sm">いいね</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stop Reason Selection */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-6 text-gray-300">
                <AlertCircle className="w-5 h-5" />
                <span className="text-lg">会議を一時停止</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {STOP_REASONS.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      selectedReason === reason
                        ? "bg-yellow-500/20 border-yellow-500 text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <button
                onClick={handlePauseMeeting}
                disabled={!selectedReason}
                className={`w-full relative px-8 py-4 rounded-xl overflow-hidden transition-all ${
                  selectedReason
                    ? "hover:scale-105 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                </div>
                <span className="relative flex items-center justify-center gap-2 text-white font-medium text-lg">
                  <StopCircle className="w-5 h-5" />
                  会議を停止
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stop Modal */}
      <AnimatePresence>
        {showStopModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-[0_0_60px_rgba(234,179,8,0.5)]"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                  <AlertCircle className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl text-center mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                会議を一時停止しました
              </h2>

              {/* Reason */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <p className="text-gray-400 text-sm mb-2">停止理由:</p>
                <p className="text-white text-xl">{recvReason}</p>
              </div>

              {/* Timer */}
              <div className="text-center mb-8">
                <p className="text-gray-400 mb-3">自動的に再開されます</p>
                <div className="inline-flex items-center justify-center w-32 h-32 bg-white/5 border border-white/10 rounded-full">
                  <div className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    {stopTimeLeft}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-2">秒</p>
              </div>

              {/* Message */}
              <p className="text-center text-gray-400">
                会議は1分間停止されます。
                <br />
                この時間を利用して議論を整理しましょう。
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
