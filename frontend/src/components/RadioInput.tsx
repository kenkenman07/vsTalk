type RadioInputProps = {
  id: string;
  value: string;
  reason: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioInput = ({ id, value, reason, onChange }: RadioInputProps) => {
  return (
    <div>
      <input
        type="radio"
        id={id}
        name="reason"
        value={value}
        onChange={onChange}
        checked={reason === value}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        className="relative mx-0 my-1 block w-90 cursor-pointer rounded-lg border-2 border-solid border-[#B9B9B9] px-12 py-2.5 text-sm delay-0 duration-500 ease-in-out before:invisible before:absolute before:left-[19px] before:top-2 before:h-5 before:w-5 before:scale-[3] before:rounded-full before:bg-black before:opacity-0 before:delay-0 before:duration-500 before:ease-in-out before:content-[''] after:absolute after:left-[21px] after:top-3 after:h-4 after:w-4 after:rounded-full after:border-2 after:border-solid after:border-black after:content-[''] peer-checked:border-black peer-checked:before:visible peer-checked:before:scale-100 peer-checked:before:opacity-100"
      >
        {value}
      </label>
    </div>
  );
};
export default RadioInput;
