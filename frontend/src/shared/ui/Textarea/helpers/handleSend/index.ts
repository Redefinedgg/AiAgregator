export const handleSend = (canSend: boolean, onClickSendButton?: () => void) => {
  if (canSend && onClickSendButton) {
    onClickSendButton();
  }
};
