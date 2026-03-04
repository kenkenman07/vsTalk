import { User } from "lucide-react";
import { motion } from "motion/react";
const UserIcon = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
      className="relative -mt-20 mb-4"
    >
      <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center border-4 border-black shadow-[0_0_40px_rgba(168,85,247,0.4)]">
        <User className="w-16 h-16 text-white" />
      </div>
    </motion.div>
  );
};
export default UserIcon;
