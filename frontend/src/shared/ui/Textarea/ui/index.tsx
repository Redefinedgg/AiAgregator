import Button from "../../Button";
import { FaLongArrowAltUp } from "react-icons/fa";
import clsx from "clsx";
import { handleSend } from "../helpers/handleSend";
import { handleKeyDown } from "../helpers/handleKeyDown";
import React, { forwardRef } from "react";

type TextareaProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  sendButton?: boolean;
  onClickSendButton?: () => void;
  placeholder?: string;
  style?: React.CSSProperties;
  defaultBorder?: boolean;
  canSend?: boolean;
};

// 👇 добавляем forwardRef
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      value,
      onChange,
      style,
      sendButton = false,
      onClickSendButton,
      placeholder,
      defaultBorder = true,
      canSend = true,
    },
    ref
  ) => {
    return (
      <div className="relative">
        <textarea
          ref={ref} // 👈 теперь ref реально привязывается
          className={clsx(
            "outline-none bg-[#070708] text-[#E9E9E9] rounded-[25px] px-[12px] py-[6px] resize-none",
            defaultBorder && "border border-[#E9E9E9]",
            sendButton && "z-[1]",
            className
          )}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, canSend, onClickSendButton)}
          value={value}
          style={style}
        />
        {sendButton && (
          <Button
            className="w-[50px] h-[50px] bg-[rgb(133,133,133)] flex rounded-[25px] items-center justify-center absolute bottom-[18px] right-[22px] z-[2]"
            label={<FaLongArrowAltUp size={32} />}
            onClick={() => handleSend(canSend, onClickSendButton)}
            disabled={!canSend}
          />
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
