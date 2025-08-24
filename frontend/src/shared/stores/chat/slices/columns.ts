import { ChatStore } from "..";
import { StateCreator } from "zustand";

export interface ColumnsSlice {
  columnsCount: number;
  setColumnsCount: (columnsCount: number) => void;
}

export const columnsSlice: StateCreator<ChatStore, [], [], ColumnsSlice> = (set) => ({
  columnsCount: 4,
  setColumnsCount: (columnsCount: number) => set({ columnsCount }),
});

export default columnsSlice;