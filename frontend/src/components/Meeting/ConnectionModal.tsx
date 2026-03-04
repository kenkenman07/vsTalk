import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import HomeButton from "../HomeButton";
import { WifiOff } from "lucide-react";

type ConnectionModalProps = {
  isConnected: boolean;
  roomName: string;
};

const ConnectionModal = ({ isConnected }: ConnectionModalProps) => {
  return (
    <AnimatePresence>
      {!isConnected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-[0_0_60px_rgba(234,179,8,0.5)]"
          >
            <HomeButton />
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                <WifiOff className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl text-center mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              接続が失われました
            </h2>

            {/* Message */}
            <p className="text-center text-gray-400">
              サーバーとの接続が失われました。
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ConnectionModal;
