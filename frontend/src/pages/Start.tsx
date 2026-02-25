import { Link, useNavigate } from "react-router";
import { ArrowLeft, Clock, Users, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useRoomStore } from "../modules/room/room.state";

export default function Start() {
  const navigate = useNavigate();
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);
  const [roomName, setRoomName] = useState("");
  const roomStore = useRoomStore();

  const handleCreateRoom = () => {
    const totalMinutes: number = hours * 60 + minutes;

    roomStore.set({ roomName, totalMinutes });

    // ミーティングページに遷移
    navigate(
      `/meeting/${encodeURIComponent(
        roomName || "新しいルーム"
      )}/${totalMinutes}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-black to-teal-950 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>ホームに戻る</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              className="inline-flex w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              ルーム作成
            </h1>
            <p className="text-xl text-gray-400">
              会議の詳細を設定してルームを作成
            </p>
          </div>

          {/* Room Name Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <label className="block text-sm text-gray-300 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              ルーム名 (オプション)
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="会議室名を入力"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
            />
          </motion.div>

          {/* Time Setting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-10"
          >
            <label className="block text-sm text-gray-300 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              会議時間
            </label>
            <div className="flex items-center gap-4 justify-center">
              {/* Hours */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setHours(Math.min(hours + 1, 12))}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
                >
                  +
                </button>
                <div className="my-4 text-center">
                  <div className="text-5xl font-bold text-white">
                    {hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">時間</div>
                </div>
                <button
                  onClick={() => setHours(Math.max(hours - 1, 0))}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
                >
                  -
                </button>
              </div>

              <div className="text-4xl text-white font-bold mb-6">:</div>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setMinutes((minutes + 15) % 60)}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
                >
                  +
                </button>
                <div className="my-4 text-center">
                  <div className="text-5xl font-bold text-white">
                    {minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">分</div>
                </div>
                <button
                  onClick={() => setMinutes((minutes - 15 + 60) % 60)}
                  className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
                >
                  -
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Time Presets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-10"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: "15分", h: 0, m: 15 },
                { label: "30分", h: 0, m: 30 },
                { label: "1時間", h: 1, m: 0 },
                { label: "2時間", h: 2, m: 0 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setHours(preset.h);
                    setMinutes(preset.m);
                  }}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white transition-all hover:scale-105"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Create Room Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center"
          >
            <button
              onClick={handleCreateRoom}
              className="group relative px-16 py-6 rounded-2xl overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              <span className="relative flex items-center gap-3 text-xl text-white font-medium">
                <Plus className="w-6 h-6" />
                ルーム作成
              </span>
            </button>
          </motion.div>

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
