// stores/chat/index.ts
import { ChatResponse } from "@/shared/types/ChatResponse";
import { Model } from "@/shared/api/ai/enums";
import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import columnsSlice from "./slices/columns";
import { ColumnsSlice } from "./slices/columns";
import SelectedModel from "@/shared/types/SelectedModel";
import SelectedModelsCount from "@/shared/types/SelectedModelsCount";
import { ChatsSlice } from "./slices/chats";
import chatsSlice from "./slices/chats";
import processingSlice, { ProcessingSlice } from "./slices/processing";
import { ChatItemsSlice, chatItemsSlice } from "./slices/chatItems";

export interface ChatStore extends ColumnsSlice, ChatsSlice, ProcessingSlice, ChatItemsSlice {
  // State
  isNewChat: boolean;
  prompt: string;
  chatResponses: ChatResponse[];
  promptWithoutResponse: string;
  selectedModels: SelectedModel[];
  selectedModelsCount: SelectedModelsCount[];

  // Actions
  addChatResponse: (response: ChatResponse) => void;
  getOneChatResponse: (id: number | undefined) => ChatResponse | undefined;
  setIsNewChat: (isNewChat: boolean) => void;
  setPrompt: (prompt: string) => void;
  setChatResponses: (updater: ChatResponse[] | ((prev: ChatResponse[]) => ChatResponse[])) => void;
  setPromptWithoutResponse: (promptWithoutResponse: string) => void;
  getCountOfModelsByModel: (model: Model) => number;
  setSelectedModels: (selectedModels: SelectedModel[]) => void;
  setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) => void;
}

export const useChatStore = createPersistedStore<ChatStore>(
  "chatStore",
  (set, get, ...args) => ({
    // State
    isNewChat: true,
    prompt: "",
    chatResponses: [],
    promptWithoutResponse: "",
    selectedModels: [],
    selectedModelsCount: [],

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

    getCountOfModelsByModel: (model: Model) => {
      return get().selectedModels.filter((m) => m.model === model).length;
    },

    setIsNewChat: (isNewChat: boolean) => set({ isNewChat }),
    setPrompt: (prompt: string) => set({ prompt }),
    setChatResponses: (updater: ChatResponse[] | ((prev: ChatResponse[]) => ChatResponse[])) =>
      set((state) => ({
        chatResponses:
          typeof updater === "function" ? updater(state.chatResponses) : updater,
      })),
    setPromptWithoutResponse: (promptWithoutResponse: string) =>
      set({ promptWithoutResponse }),
    setSelectedModels: (selectedModels: SelectedModel[]) =>
      set({ selectedModels }),
    setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) =>
      set({ selectedModelsCount }),

    // Подключаем слайсы
    ...columnsSlice(set, get, ...args),
    ...chatsSlice(set, get, ...args),
    ...processingSlice(set, get, ...args),
    ...chatItemsSlice(set, get, ...args),
  })
);
