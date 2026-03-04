import { Plus } from "lucide-react";
import { motion } from "motion/react";

type CreateRoomButtonProps = {
  onClick: () => void;
};

const CreateRoomButton = ({ onClick }: CreateRoomButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex justify-center"
    >
      <button
        onClick={onClick}
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
  );
};
export default CreateRoomButton;
