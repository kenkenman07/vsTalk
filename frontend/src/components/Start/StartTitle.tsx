import { Users } from "lucide-react";
import { motion } from "motion/react";

const StartTitle = () => {
  return (
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
      <p className="text-xl text-gray-400">会議の詳細を設定してルームを作成</p>
    </div>
  );
};
export default StartTitle;
