import { Crown, ThumbsUp, Trophy } from "lucide-react";
import { motion } from "motion/react";
import type { Participant } from "../../modules/participant/participant.entity";

type ParticipantRankingProps = {
  participants: Participant[];
};

const ParticipantRanking = ({ participants }: ParticipantRankingProps) => {
  // いいね数でソート
  const sortedParticipants = [...participants].sort(
    (a, b) => b.likes - a.likes
  );

  // ランキングの色
  const getRankColor = (index: number) => {
    if (index === 0) return "from-yellow-400 to-orange-500";
    if (index === 1) return "from-gray-300 to-gray-400";
    if (index === 2) return "from-amber-600 to-amber-700";
    return "from-purple-400 to-pink-500";
  };

  return (
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
  );
};
export default ParticipantRanking;
