import { ChatResponse } from "@/shared/types/ChatResponse";
import { Model } from "@/shared/api/ai/enums";
import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import columns from "./slices/columns";
import { ColumnsSlice } from "./slices/columns";

export interface SelectedModel {
  model: Model;
  number: number;
}

export interface SelectedModelsCount {
  model: Model;
  count: number;
}

export interface ChatStore extends ColumnsSlice {
  // State
  chatUuid: string | undefined;
  isNewChat: boolean;
  prompt: string;
  chatResponses: ChatResponse[];
  currentUuid: string;
  promptWithoutResponse: string;
  selectedModels: SelectedModel[];
  selectedModelsCount: SelectedModelsCount[];
  // Actions
  addChatResponse: (response: ChatResponse) => void;
  getOneChatResponse: (id: number | undefined) => ChatResponse | undefined;
  setChatUuid: (uuid: string) => void;
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
    chatUuid: undefined,
    isNewChat: true,
    prompt: "",
    chatResponses: [],
    currentUuid: "",
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
    setChatUuid: (uuid: string) => set({ chatUuid: uuid }),
    setIsNewChat: (isNewChat: boolean) => set({ isNewChat }),
    setPrompt: (prompt: string) => set({ prompt }),
    setChatResponses: (chatResponses: ChatResponse[]) => set({ chatResponses }),
    setPromptWithoutResponse: (promptWithoutResponse: string) =>
      set({ promptWithoutResponse }),
    setSelectedModels: (selectedModels: SelectedModel[]) =>
      set({ selectedModels }),
    setSelectedModelsCount: (selectedModelsCount: SelectedModelsCount[]) =>
      set({ selectedModelsCount }),
    ...columns(set, get, ...args),
  })
);