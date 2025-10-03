import Button from "@/shared/ui/Button";
import { FiEdit } from "react-icons/fi";

type Props = {
  onClick: () => void;
}

export default function EditChatTitleButton({ onClick }: Props) {
  return (
    <Button
      label={<FiEdit size={20} />}
      className="flex items-center justify-center border-none py-[12px]"
      onClick={onClick}
    />
  );
}
