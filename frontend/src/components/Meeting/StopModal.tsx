import { AlertCircle } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

type StopModalProps = {
  showStopModal: boolean;
  recvReason: string;
  stopTimeLeft: number;
};

const StopModal = ({
  showStopModal,
  recvReason,
  stopTimeLeft,
}: StopModalProps) => {
  return (
    <AnimatePresence>
      {showStopModal && (
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
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)]">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl text-center mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              会議を一時停止しました
            </h2>

            {/* Reason */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
              <p className="text-gray-400 text-sm mb-2">停止理由:</p>
              <p className="text-white text-xl">{recvReason}</p>
            </div>

            {/* Timer */}
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-3">自動的に再開されます</p>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white/5 border border-white/10 rounded-full">
                <div className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {stopTimeLeft}
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-2">秒</p>
            </div>

            {/* Message */}
            <p className="text-center text-gray-400">
              会議は1分間停止されます。
              <br />
              この時間を利用して議論を整理しましょう。
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default StopModal;
