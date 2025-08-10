import { FaCopy } from "react-icons/fa";
import Button from "../../Button";
import { FC } from "react";
import { copyText } from "@/shared/helpers/copyText";

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ text, className }) => {

  return (
    <Button
      label={<FaCopy />}
      onClick={() => copyText(text)}
      className={`scale-90 ${className}`}
    />
  );
};

export default CopyButton;
