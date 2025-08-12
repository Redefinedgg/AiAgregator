import { JSX } from "react";

type ButtonProps = {
  label: string | React.ReactNode | JSX.Element;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  defaultBorder?: boolean;
};

export default function Button({
  label,
  onClick,
  className,
  disabled = false,
  defaultBorder = true,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
         "outline-none bg-[#070708] text-[#E9E9E9] rounded-[12px] px-[12px] py-[6px]" +
        (disabled ? " cursor-not-allowed opacity-50" : " cursor-pointer") +
        (className ? " " + className : "")
        + "hover:bg-[#E9E9E9] hover:text-[#070708] transition-all duration-90"
        + (defaultBorder ? " border-[1px] border-[#E9E9E9]" : "border-none")
      }
    >
      {label}
    </button>
  );
}
