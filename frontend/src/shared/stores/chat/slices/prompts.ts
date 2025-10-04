import { StateCreator } from "zustand";
import { ChatStore } from "..";

export interface PromptSlice {
  prompt: string;
  oldPrompt: string;
  promptWithoutResponse: string;

  setPrompt: (prompt: string) => void;
  setOldPrompt: (oldPrompt: string) => void;
  setPromptWithoutResponse: (promptWithoutResponse: string) => void;
}

export const promptSlice: StateCreator<ChatStore, [], [], PromptSlice> = (
  set,
  get,
  ...args
) => ({
  prompt: "",
  oldPrompt: "",
  promptWithoutResponse: "",

  setPrompt: (prompt: string) => set({ prompt }),
  setOldPrompt: (oldPrompt: string) => set({ oldPrompt }),
  setPromptWithoutResponse: (promptWithoutResponse: string) => set({ promptWithoutResponse }),
});

export default promptSlice;
