import { ArrowRightLeft, RotateCcw, Speech, TrainTrack } from "lucide-react";

const stopReasons = [
  {
    label: "話の繰り返し",
    icon: <RotateCcw className="w-9 h-9 sm:w-15 sm:h-15" />,
  },
  {
    label: "話の脱線",
    icon: <TrainTrack className="w-9 h-9 sm:w-15 sm:h-15" />,
  },
  {
    label: "共通認識のズレ",
    icon: <ArrowRightLeft className="w-9 h-9 sm:w-15 sm:h-15" />,
  },
  {
    label: "話のターンの独占",
    icon: <Speech className="w-9 h-9 sm:w-15 sm:h-15" />,
  },
];

type CauseOptionProps = {
  setSelectedReason: (reason: string) => void;
  selectedReason: string;
  setIsHover: (reason: number | null) => void;
  isHover: number | null;
};

const CauseOption = ({
  setSelectedReason,
  selectedReason,
  setIsHover,
  isHover,
}: CauseOptionProps) => {
  return (
    <div className="flex gap-5 sm:gap-10">
      {stopReasons.map((reason, i) => {
        return (
          <button
            key={i}
            onClick={() => setSelectedReason(reason.label)}
            onMouseEnter={() => setIsHover(i)}
            onMouseLeave={() => setIsHover(null)}
            className={`flex flex-col items-center rounded-2xl p-1 sm:p-3 gap-3 ${
              selectedReason == reason.label &&
              "bg-red-400 text-white font-bold"
            } ${isHover == i && "bg-red-300 text-white font-bold"}`}
          >
            <div>{reason.icon}</div>
            <div className="text-[11px]">{reason.label}</div>
          </button>
        );
      })}
    </div>
  );
};
export default CauseOption;
