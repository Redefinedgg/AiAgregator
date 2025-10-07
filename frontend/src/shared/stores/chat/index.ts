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
import chatTitleSlice, { ChatTitleSlice } from "./slices/chatTitle";
import promptSlice, { PromptSlice } from "./slices/prompts";
import luckyPromptSlice, { LuckyPromptSlice } from "./slices/luckyPrompt";

export interface ChatStore
  extends PromptSlice,
    ColumnsSlice,
    ChatsSlice,
    ProcessingSlice,
    ChatItemsSlice,
    ChatTitleSlice,
    LuckyPromptSlice {
  // State
  isNewChat: boolean;
  chatResponses: ChatResponse[];
  selectedModels: SelectedModel[];
  selectedModelsCount: SelectedModelsCount[];

  // Actions
  addChatResponse: (response: ChatResponse) => void;
  getOneChatResponse: (id: number | undefined) => ChatResponse | undefined;
  setIsNewChat: (isNewChat: boolean) => void;
  setChatResponses: (
    updater: ChatResponse[] | ((prev: ChatResponse[]) => ChatResponse[])
  ) => void;
  getCountOfModelsByModel: (model: Model) => number;
  setSelectedModels: (selectedModels: SelectedModel[]) => void;
  setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) => void;
}

export const useChatStore = createPersistedStore<ChatStore>(
  "chatStore",
  (set, get, ...args) => ({
    // State
    isNewChat: true,
    chatResponses: [],
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
    setChatResponses: (
      updater: ChatResponse[] | ((prev: ChatResponse[]) => ChatResponse[])
    ) =>
      set((state) => ({
        chatResponses:
          typeof updater === "function"
            ? updater(state.chatResponses)
            : updater,
      })),
    setSelectedModels: (selectedModels: SelectedModel[]) =>
      set({ selectedModels }),
    setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) =>
      set({ selectedModelsCount }),

    // Подключаем слайсы
    ...columnsSlice(set, get, ...args),
    ...chatsSlice(set, get, ...args),
    ...processingSlice(set, get, ...args),
    ...chatItemsSlice(set, get, ...args),
    ...chatTitleSlice(set, get, ...args),
    ...promptSlice(set, get, ...args),
    ...luckyPromptSlice(set, get, ...args),
  })
);
