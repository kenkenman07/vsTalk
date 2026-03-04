import { Users } from "lucide-react";
import { motion } from "motion/react";
const JoinTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center mb-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
        className="inline-flex w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
      >
        <Users className="w-12 h-12 text-white" />
      </motion.div>
      <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
        ルーム参加
      </h1>
      <p className="text-xl text-gray-400">既存の会議室に参加する</p>
    </motion.div>
  );
};
export default JoinTitle;
