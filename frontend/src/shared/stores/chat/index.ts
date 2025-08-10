import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChatResponse } from "@/shared/types/ChatResponse";

interface ChatStore {
  // State
  chatUuid: string | undefined;
  isNewChat: boolean;
  prompt: string;
  chatResponses: ChatResponse[];

  // Actions
  getOneChatResponse: (
    id: number | undefined,
  ) => ChatResponse | undefined;
  setChatUuid: (uuid: string) => void;
  setIsNewChat: (isNewChat: boolean) => void;
  setPrompt: (prompt: string) => void;
  setChatResponses: (chatResponses: ChatResponse[]) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // State
      chatUuid: undefined,
      isNewChat: true,
      prompt: "",
      chatResponses: [],

      // Actions
      getOneChatResponse: (id: number | undefined) => {
        if (!id) return undefined;
        const response = get().chatResponses.find(
          (response) => response.id === id
        );
        return response;
      },
      
      setChatUuid: (uuid: string) => set({ chatUuid: uuid }),
      setIsNewChat: (isNewChat: boolean) => set({ isNewChat }),
      setPrompt: (prompt: string) => set({ prompt }),
      setChatResponses: (chatResponses: ChatResponse[]) =>
        set({ chatResponses }),
    }),
    {
      name: "chatStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
