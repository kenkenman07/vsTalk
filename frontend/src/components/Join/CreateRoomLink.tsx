import { Users } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const CreateRoomLink = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="text-center pb-8"
    >
      <p className="text-gray-400 mb-4">参加したいルームが見つかりませんか？</p>
      <Link
        to="/start"
        className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-105"
      >
        <Users className="w-5 h-5" />
        新しいルームを作成
      </Link>
    </motion.div>
  );
};
export default CreateRoomLink;
