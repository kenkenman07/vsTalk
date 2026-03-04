import { Trophy } from "lucide-react";
import { motion } from "motion/react";

type ResultTitleProps = {
  roomName: string;
};

const ResultTitle = ({ roomName }: ResultTitleProps) => {
  return (
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
  );
};
export default ResultTitle;
