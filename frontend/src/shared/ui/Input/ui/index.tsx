import { FC } from "react";

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input: FC<Props> = ({ className = "", value, onChange, placeholder }) => {
  const baseClassName = "outline-none bg-[#070708] text-[#E9E9E9] rounded-[25px] px-[12px] py-[6px]";
  return (
    <input
      className={baseClassName + " " + className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default Input;
