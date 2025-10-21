import { StateCreator } from "zustand";
import { ChatResponse } from "@/shared/types/ChatResponse";
import { ChatStore } from "../index";

export interface SelectedResponseSlice {
  // State
  selectedResponse: number | null;
  widthOfFirstPart: number;
  widthOfSecondPart: number;
  // Actions
  setWidthOfFirstPart: (width: number) => void;
  setWidthOfSecondPart: (width: number) => void;
  setSelectedResponse: (response: number | null) => void;
}

export const selectedResponseSlice: StateCreator<
  ChatStore,
  [],
  [],
  SelectedResponseSlice
> = (set, get, ...args) => ({
  // State
  selectedResponse: null,
  widthOfFirstPart: 50, // 45% для левой панели
  widthOfSecondPart: 50, // 55% для правой панели (100% - 45%)
  // Actions
  setSelectedResponse: (response: number | null) =>
    set({ selectedResponse: response }),
  setWidthOfFirstPart: (width: number) =>
    set({ widthOfFirstPart: width }),
  setWidthOfSecondPart: (width: number) =>
    set({ widthOfSecondPart: width }),
});