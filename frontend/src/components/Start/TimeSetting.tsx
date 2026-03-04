import { Clock } from "lucide-react";
import { motion } from "motion/react";

type TimeSettingProps = {
  hours: number;
  onClickHoursPlus: () => void;
  onClickHoursMinus: () => void;
  minutes: number;
  onClickMinutesPlus: () => void;
  onClickMinutesMinus: () => void;
};

const TimeSetting = ({
  hours,
  onClickHoursPlus,
  onClickHoursMinus,
  minutes,
  onClickMinutesPlus,
  onClickMinutesMinus,
}: TimeSettingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-10"
    >
      <label className="block text-sm text-gray-300 mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        会議時間
      </label>
      <div className="flex items-center gap-4 justify-center">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            onClick={onClickHoursPlus}
            className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
          >
            +
          </button>
          <div className="my-4 text-center">
            <div className="text-5xl font-bold text-white">
              {hours.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-400 mt-1">時間</div>
          </div>
          <button
            onClick={onClickHoursMinus}
            className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
          >
            -
          </button>
        </div>

        <div className="text-4xl text-white font-bold mb-6">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            onClick={onClickMinutesPlus}
            className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
          >
            +
          </button>
          <div className="my-4 text-center">
            <div className="text-5xl font-bold text-white">
              {minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-400 mt-1">分</div>
          </div>
          <button
            onClick={onClickMinutesMinus}
            className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all hover:scale-110"
          >
            -
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default TimeSetting;
