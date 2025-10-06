import { ChatStore } from "..";
import { StateCreator } from "zustand";

export interface LuckyPromptSlice {
  luckyPromptIsLoading: boolean;
  setLuckyPromptIsLoading: (luckyPromptIsLoading: boolean) => void;
}

export const luckyPromptSlice: StateCreator<
  ChatStore,
  [],
  [],
  LuckyPromptSlice
> = (set, get, ...args) => ({
  luckyPromptIsLoading: false,
  setLuckyPromptIsLoading: (luckyPromptIsLoading: boolean) =>
    set({ luckyPromptIsLoading }),
});

export default luckyPromptSlice;
