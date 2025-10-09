import { LOGO_SIZES } from "@/shared/constants/LOGO_SIZES";
import { useChatStore } from "@/shared/stores/chat";

export const useGetSizeOfLogo = (id: number) => {
    const { getOneChatResponse } = useChatStore();
    
    return LOGO_SIZES[getOneChatResponse(id)?.logo || ""] || {
      w: 64,
      h: 64,
    };
};

export default useGetSizeOfLogo;
