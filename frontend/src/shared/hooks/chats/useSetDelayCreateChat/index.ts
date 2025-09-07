import { useChatStore } from "@/shared/stores/chat";
import { DEFAULT_DELAY } from "@/shared/constants/DEFAULT_DELAY";

interface Props {
  delay?: number;
}

export const useSetDelayCreateChat = ({ delay = DEFAULT_DELAY }: Props = {}) => {
  const { setNowDelayted } = useChatStore();

  const setDelayCreateChat = () => {
    setNowDelayted(true);
    setTimeout(() => {
      setNowDelayted(false);
    }, delay);
  };

  return { setDelayCreateChat };
};