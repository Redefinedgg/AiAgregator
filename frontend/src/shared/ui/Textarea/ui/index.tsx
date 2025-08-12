import Button from "../../Button";
import { FaLongArrowAltUp } from "react-icons/fa";
import { KeyboardEvent } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";

type TextareaProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  sendButton?: boolean;
  onClickSendButton?: () => void;
  placeholder?: string;
  defaultBorder?: boolean;
  canSend?: boolean;
};

export default function Textarea({
  className,
  value,
  onChange,
  sendButton = false,
  onClickSendButton,
  placeholder,
  defaultBorder = true,
  canSend = true,
}: TextareaProps) {

  const handleSend = () => {
    if (canSend && onClickSendButton) {
      onClickSendButton();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && canSend) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Enter" && !e.shiftKey && !canSend) {
      e.preventDefault();
      toast.error("You need to write prompt and select models");
    }
  };

  return (
    <div className="relative">
      <textarea
        className={clsx(
          "outline-none bg-[#070708] text-[#E9E9E9] rounded-[25px] px-[12px] py-[6px] resize-none",
          defaultBorder && "border border-[#E9E9E9]",
          sendButton && "z-[1]",
          className
        )}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        value={value}
      />
      {sendButton && (
        <Button
          className="w-[50px] h-[50px] bg-[rgb(133,133,133)] flex rounded-[25px] items-center justify-center absolute bottom-[25px] right-[25px] z-[2]"
          label={<FaLongArrowAltUp size={32} />}
          onClick={handleSend}
          disabled={!canSend}
        />
      )}
    </div>
  );
}
