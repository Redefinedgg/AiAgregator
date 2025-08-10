import Button from "../../Button";
import { FaLongArrowAltUp } from "react-icons/fa";

type TextareaProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  sendButton?: boolean;
  onClickSendButton?: () => void;
  placeholder?: string;
};

export default function Textarea({
  className = "",
  value,
  onChange,
  sendButton = false,
  onClickSendButton,
  placeholder,
}: TextareaProps) {
  return (
    <div className="relative">
      <textarea
        className={
          "border-none outline-none bg-[#070708] text-[#E9E9E9] rounded-[25px] px-[12px] py-[6px] resize-none" +
          (sendButton && " z-[1]") +
          (className ? " " + className : "")
        }
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {sendButton && (
        <Button
          className="w-[50px] h-[50px] bg-[rgb(133,133,133)] flex rounded-[25px] items-center justify-center absolute bottom-[6px] right-[6px] z-[2]"
          label={<FaLongArrowAltUp size={32} />}
          onClick={onClickSendButton}
          disabled={value.length === 0}
        />
      )}
    </div>
  );
}
