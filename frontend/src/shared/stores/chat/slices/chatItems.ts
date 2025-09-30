import { StateCreator } from "zustand";
import { ChatStore } from "..";

export interface ChatItemsSlice {
  editingItem: string | null;
  tempItemName: string;
  startEditingItem: (uuid: string, currentName: string) => void;
  changeTempItemName: (value: string) => void;
  stopEditingItem: () => void;
}

export const chatItemsSlice: StateCreator<ChatStore, [], [], ChatItemsSlice> = (
  set,
  get,
  ...args
) => ({
  editingItem: null,
  tempItemName: "",

  startEditingItem: (uuid: string, currentName: string) => set({ editingItem: uuid, tempItemName: currentName }),
  changeTempItemName: (value: string) => set({ tempItemName: value }),
  stopEditingItem: () => set({ editingItem: null, tempItemName: "" }),
});

export default chatItemsSlice;
