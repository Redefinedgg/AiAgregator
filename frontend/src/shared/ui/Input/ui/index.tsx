import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
}

export const Input: FC<Props> = ({
  className = "",
  value,
  onChange,
  placeholder,
  onBlur,
  onKeyDown,
  ...rest
}) => {
  const baseClassName =
    "outline-none bg-[#070708] border border-[#Ffffff] text-[#E9E9E9] rounded-[12px] px-[12px] py-[6px]";
  return (
    <input
      className={baseClassName + " " + className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
