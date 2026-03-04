import { Users } from "lucide-react";
import { motion } from "motion/react";
import type React from "react";

type RoomNameInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RoomNameInput = ({ value, onChange }: RoomNameInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-8"
    >
      <label className="text-sm text-gray-300 mb-3 flex items-center gap-2">
        <Users className="w-4 h-4" />
        ルーム名
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="会議室名を入力"
        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
      />
    </motion.div>
  );
};
export default RoomNameInput;
