import { ChatStore } from "..";
import { StateCreator } from "zustand";

export interface ContextSlice {
  contextPrompt: string;
  isShowContextPrompt: boolean;
  setContextPrompt: (contextPrompt: string) => void;
  setIsShowContextPrompt: (isShowContextPrompt: boolean) => void;
}

export const contextSlice: StateCreator<ChatStore, [], [], ContextSlice> = (set) => ({
  contextPrompt: "",
  isShowContextPrompt: false,
  setContextPrompt: (contextPrompt: string) => set({ contextPrompt }),
  setIsShowContextPrompt: (isShowContextPrompt: boolean) => set({ isShowContextPrompt }),
});

export default contextSlice;
