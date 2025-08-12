import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChatResponse } from "@/shared/types/ChatResponse";

interface ChatStore {
  // State
  chatUuid: string | undefined;
  isNewChat: boolean;
  prompt: string;
  chatResponses: ChatResponse[];
  currentUuid: string;
  promptWithoutResponse: string;
  columnsCount: number;

  // Actions
  getOneChatResponse: (
    id: number | undefined,
  ) => ChatResponse | undefined;
  setChatUuid: (uuid: string) => void;
  setIsNewChat: (isNewChat: boolean) => void;
  setPrompt: (prompt: string) => void;
  setChatResponses: (chatResponses: ChatResponse[]) => void;
  setPromptWithoutResponse: (promptWithoutResponse: string) => void;
  setColumnsCount: (columnsCount: number) => void;

}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // State
      chatUuid: undefined,
      isNewChat: true,
      prompt: "",
      chatResponses: [],
      currentUuid: "",
      promptWithoutResponse: "",
      columnsCount: 4,

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
      setPromptWithoutResponse: (promptWithoutResponse: string) =>
        set({ promptWithoutResponse }),
      setColumnsCount: (columnsCount: number) => set({ columnsCount }),
    }),
    {
      name: "chatStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
