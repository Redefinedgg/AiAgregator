import { JSX } from "react";

type ButtonProps = {
  label: string | React.ReactNode | JSX.Element;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  label,
  onClick,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "border-none outline-none bg-[#070708] text-[#E9E9E9] rounded-[12px] px-[12px] py-[6px]" +
        (disabled ? " cursor-not-allowed opacity-50" : " cursor-pointer") +
        (className ? " " + className : "")
      }
    >
      {label}
    </button>
  );
}
