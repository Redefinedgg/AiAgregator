import { ChatResponse } from "@/shared/types/ChatResponse";
import { Model } from "@/shared/api/ai/enums";
import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import columnsSlice from "./slices/columns";
import { ColumnsSlice } from "./slices/columns";
import SelectedModel from "@/shared/types/SelectedModel";
import SelectedModelsCount from "@/shared/types/SelectedModelsCount";
import { ChatsSlice } from "./slices/chats";
import chatsSlice from "./slices/chats";


export interface ChatStore extends ColumnsSlice, ChatsSlice {

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
  setChatResponses: (chatResponses: ChatResponse[]) => void;
  setPromptWithoutResponse: (promptWithoutResponse: string) => void;
  getCountOfModelsByModel: (model: Model) => number;
  setSelectedModels: (selectedModels: SelectedModel[]) => void;
  setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) => void;
  updateChatResponse: (id: number, updatedResponse: ChatResponse) => void;
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
    updateChatResponse: (id: number, updatedResponse: ChatResponse) => {
      set((state) => ({
        chatResponses: state.chatResponses.map((response) =>
          response.id === id ? updatedResponse : response
        ),
      }));
    },
    setIsNewChat: (isNewChat: boolean) => set({ isNewChat }),
    setPrompt: (prompt: string) => set({ prompt }),
    setChatResponses: (chatResponses: ChatResponse[]) => set({ chatResponses }),
    setPromptWithoutResponse: (promptWithoutResponse: string) =>
      set({ promptWithoutResponse }),
    setSelectedModels: (selectedModels: SelectedModel[]) =>
      set({ selectedModels }),
    setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) =>
      set({ selectedModelsCount }),
    ...columnsSlice(set, get, ...args),
    ...chatsSlice(set, get, ...args),
  })
);