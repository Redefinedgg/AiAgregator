import { ChatStore } from "..";
import { StateCreator } from "zustand";

export interface ColumnsSlice {
  columnsCount: number;
  setColumnsCount: (columnsCount: number) => void;
}

export const columns: StateCreator<ChatStore, [], [], ColumnsSlice> = (set) => ({
  columnsCount: 4,
  setColumnsCount: (columnsCount: number) => set({ columnsCount }),
});

export default columns;