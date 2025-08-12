import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ChatResponse } from "@/shared/types/ChatResponse";
import { Model } from "@/shared/api/ai/enums";

export interface SelectedModel {
  model: Model
  number: number
}

export interface ChatStore {
  // State
  chatUuid: string | undefined;
  isNewChat: boolean;
  prompt: string;
  chatResponses: ChatResponse[];
  currentUuid: string;
  promptWithoutResponse: string;
  columnsCount: number;
  selectedModels: SelectedModel[]
 
  // Actions
  addChatResponse: (response: ChatResponse) => void;
  getOneChatResponse: (
    id: number | undefined,
  ) => ChatResponse | undefined;
  setChatUuid: (uuid: string) => void;
  setIsNewChat: (isNewChat: boolean) => void;
  setPrompt: (prompt: string) => void;
  setChatResponses: (chatResponses: ChatResponse[]) => void;
  setPromptWithoutResponse: (promptWithoutResponse: string) => void;
  setColumnsCount: (columnsCount: number) => void;
  setSelectedModels: (selectedModels: SelectedModel[]) => void;
  updateChatResponse: (id: number, updatedResponse: ChatResponse) => void;
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
      selectedModels: [],

      // Actions
      addChatResponse: (response: ChatResponse) => {
        set((state) => ({
          chatResponses: [...state.chatResponses, response],
        }));
      },

      getOneChatResponse: (id: number | undefined) => {
        if (!id) return undefined;
        const response = get().chatResponses.find(
          (response) => response.id === id
        );
        return response;
      },

      // ИСПРАВЛЕННАЯ функция updateChatResponse
      updateChatResponse: (id: number, updatedResponse: ChatResponse) => {
        set((state) => ({
          chatResponses: state.chatResponses.map((response) =>
            response.id === id ? updatedResponse : response // Здесь была ошибка!
          ),
        }));
      },

      setChatUuid: (uuid: string) => set({ chatUuid: uuid }),
      setIsNewChat: (isNewChat: boolean) => set({ isNewChat }),
      setPrompt: (prompt: string) => set({ prompt }),
      setChatResponses: (chatResponses: ChatResponse[]) =>
        set({ chatResponses }),
      setPromptWithoutResponse: (promptWithoutResponse: string) =>
        set({ promptWithoutResponse }),
      setColumnsCount: (columnsCount: number) => set({ columnsCount }),
      setSelectedModels: (selectedModels: SelectedModel[]) => set({ selectedModels }),
    }),
    {
      name: "chatStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);