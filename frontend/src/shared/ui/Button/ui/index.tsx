import { JSX } from "react";
import clsx from "clsx";

type ButtonProps = {
  label: string | React.ReactNode | JSX.Element;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  defaultBorder?: boolean;
  selected?: boolean;
};

export default function Button({
  label,
  onClick,
  className,
  disabled = false,
  defaultBorder = true,
  selected = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        // Base styles - always applied
        "outline-none rounded-[12px] px-[12px] py-[6px] transition-all duration-90",
        
        // Cursor styles
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        
        // Border styles
        defaultBorder ? "border border-[#E9E9E9]" : "border-none",
        
        // Hover effects - separate for selected and unselected states
        !disabled && [
          "hover:scale-[1.04]",
          selected 
            ? "hover:bg-[rgb(200,200,200)] hover:text-[#070708]"
            : "hover:bg-[rgb(25,25,25)]"
        ],
        
        // Background and text colors based on selected state
        selected ? [
          "bg-[#E9E9E9]",
          "text-[#070708]"
        ] : [
          "bg-[#070708]",
          "text-[#E9E9E9]"
        ],
        
        // Custom className override
        className
      )}
    >
      {label}
    </button>
  );
}