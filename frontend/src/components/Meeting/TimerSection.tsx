import { Clock } from "lucide-react";
import { motion } from "motion/react";
import type { Participant } from "../../modules/participant/participant.entity";

type TimerSectionProps = {
  duration: number;
  timeLeft: number;
  isRunning: boolean;
  participant: Participant[];
};

const TimerSection = ({
  duration,
  timeLeft,
  isRunning,
  participant,
}: TimerSectionProps) => {
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

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

  return (
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

        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-48 h-48 mb-4">
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
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
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
            <span className="text-white">{participant?.length}人</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default TimerSection;
