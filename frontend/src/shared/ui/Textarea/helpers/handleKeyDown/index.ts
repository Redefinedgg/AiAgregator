import { KeyboardEvent } from "react";
import { toast } from "react-toastify";
import { handleSend } from "../handleSend";

export const handleKeyDown = (
  e: KeyboardEvent<HTMLTextAreaElement>,
  canSend: boolean,
  onClickSendButton?: () => void
) => {
  if (e.key === "Enter" && !e.shiftKey && canSend) {
    e.preventDefault();
    handleSend(canSend, onClickSendButton);
  } else if (e.key === "Enter" && !e.shiftKey && !canSend) {
    e.preventDefault();
    toast.error("You need to write prompt and select models");
  }
};
