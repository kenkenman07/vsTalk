import { AlertCircle, StopCircle } from "lucide-react";
import { useEffect } from "react";
const STOP_REASONS = [
  "話の繰り返し",
  "話の脱線",
  "前の議事録を再確認してください",
  "話が長すぎます",
];

type StopReasonSelectionProps = {
  showStopModal: boolean;
  resumeMeeting: () => void;
  selectedReason: string;
  onClickReason: (reason: string) => void;
  onClickStop: () => void;
};

const StopReasonSelection = ({
  showStopModal,
  resumeMeeting,
  selectedReason,
  onClickReason,
  onClickStop,
}: StopReasonSelectionProps) => {
  // 停止モーダルのタイマー
  useEffect(() => {
    if (!showStopModal) return;

    const timer = setInterval(() => {
      resumeMeeting();
    }, 1000);
    return () => clearInterval(timer);
  }, [showStopModal]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
      <div className="flex items-center gap-2 mb-6 text-gray-300">
        <AlertCircle className="w-5 h-5" />
        <span className="text-lg">会議を一時停止</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {STOP_REASONS.map((reason) => (
          <button
            key={reason}
            onClick={() => onClickReason(reason)}
            className={`px-4 py-3 rounded-xl border transition-all ${
              selectedReason === reason
                ? "bg-yellow-500/20 border-yellow-500 text-white"
                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
            }`}
          >
            {reason}
          </button>
        ))}
      </div>

      <button
        onClick={onClickStop}
        disabled={!selectedReason}
        className={`w-full relative px-8 py-4 rounded-xl overflow-hidden transition-all ${
          selectedReason
            ? "hover:scale-105 cursor-pointer"
            : "opacity-50 cursor-not-allowed"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
        <span className="relative flex items-center justify-center gap-2 text-white font-medium text-lg">
          <StopCircle className="w-5 h-5" />
          会議を停止
        </span>
      </button>
    </div>
  );
};
export default StopReasonSelection;
