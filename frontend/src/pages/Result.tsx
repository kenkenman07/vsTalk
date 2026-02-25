import { Link, useSearchParams } from "react-router";
import { Home, Trophy, ThumbsUp, BarChart, Crown } from "lucide-react";
import { motion } from "motion/react";
import { useParticipantStore } from "../modules/participant/participant.state";

export default function Result() {
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get("room") || "会議室";
  const stopCount = parseInt(searchParams.get("stops") || "0");
  const participantStore = useParticipantStore();

  const participants = participantStore.participant;

  // いいね数でソート
  const sortedParticipants = [...participants].sort(
    (a, b) => b.likes - a.likes
  );
  const totalLikes = participants.reduce((sum, p) => sum + p.likes, 0);

  // ランキングの色
  const getRankColor = (index: number) => {
    if (index === 0) return "from-yellow-400 to-orange-500";
    if (index === 1) return "from-gray-300 to-gray-400";
    if (index === 2) return "from-amber-600 to-amber-700";
    return "from-purple-400 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-black to-purple-950 p-4">
      <div className="max-w-5xl mx-auto pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="inline-flex w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full items-center justify-center mb-6 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            会議終了
          </h1>
          <p className="text-xl text-gray-400">{roomName}</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Stop Count */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <BarChart className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">会議停止回数</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">
                  {stopCount}
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              会議中に一時停止した回数です
            </p>
          </motion.div>

          {/* Total Likes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <ThumbsUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">合計いいね数</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {totalLikes}
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              全参加者が獲得したいいねの合計
            </p>
          </motion.div>
        </div>

        {/* Participants Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl text-white">参加者ランキング</h2>
          </div>

          <div className="space-y-4">
            {sortedParticipants.map((participant, index) => (
              <motion.div
                key={participant.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Rank Number */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {index < 3 ? (
                      <div className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                        {index + 1}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-gray-500">
                        {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${getRankColor(
                        index
                      )} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                    >
                      {participant.name.charAt(0)}
                    </div>
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2">
                        <Crown className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-xl">
                      {participant.name}
                    </h3>
                    {index === 0 && (
                      <p className="text-yellow-400 text-sm font-medium">
                        🎉 最優秀参加者
                      </p>
                    )}
                  </div>

                  {/* Likes Count */}
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10">
                    <ThumbsUp className="w-5 h-5 text-pink-400" />
                    <span className="text-2xl font-bold text-white">
                      {participant.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center pb-8"
        >
          <Link
            to="/"
            className="group relative px-12 py-5 rounded-2xl overflow-hidden transition-all hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
            <span className="relative flex items-center gap-3 text-xl text-white font-medium">
              <Home className="w-6 h-6" />
              ホームに戻る
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
