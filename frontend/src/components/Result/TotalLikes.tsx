import { ThumbsUp } from "lucide-react";
import { motion } from "motion/react";

type TotalLikesProps = {
  totalLikes: number;
};

const TotalLikes = ({ totalLikes }: TotalLikesProps) => {
  return (
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
      <p className="text-gray-500 text-sm">全参加者が獲得したいいねの合計</p>
    </motion.div>
  );
};
export default TotalLikes;
