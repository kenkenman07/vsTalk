import { ThumbsUp } from "lucide-react";
import { motion } from "motion/react";

type StatusSectionProps = {
  likes: number;
};

const StatusSection = ({ likes }: StatusSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
      className="mb-8"
    >
      <div className="grid grid-cols-3 gap-4">
        {/* Total Likes */}
        <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
              <ThumbsUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent mb-1">
            {likes}
          </p>
          <p className="text-sm text-gray-400">獲得いいね</p>
        </div>
      </div>
    </motion.div>
  );
};
export default StatusSection;
