import RadioInput from "./RadioInput";

type CauseOptionProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reason: string;
};

const CauseOption = ({ onChange, reason }: CauseOptionProps) => {
  return (
    <div className="font-bold border p-6 bg-white/70 flex flex-col items-center shadow rounded-lg">
      <div className="mb-3 text-2xl">中断の理由を選んでください</div>

      <RadioInput
        id="radio-inpt1"
        value="話の繰り返しが起きています"
        reason={reason}
        onChange={onChange}
      />

      <RadioInput
        id="radio-input2"
        value="話が脱線しています"
        reason={reason}
        onChange={onChange}
      />

      <RadioInput
        id="radio-input3"
        value="前の議事録を再確認してください"
        reason={reason}
        onChange={onChange}
      />

      <RadioInput
        id="radio-input4"
        value="話が長すぎます"
        reason={reason}
        onChange={onChange}
      />
    </div>
  );
};
export default CauseOption;
