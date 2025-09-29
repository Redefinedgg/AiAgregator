import { StateCreator } from "zustand";
import { ChatStore } from "..";

export interface ChatItemsSlice {
  editingUuid: string | null;
  tempName: string;
  startEditing: (uuid: string, currentName: string) => void;
  changeTempName: (value: string) => void;
  stopEditing: () => void;
}

export const chatItemsSlice: StateCreator<ChatStore, [], [], ChatItemsSlice> = (
  set,
  get,
  ...args
) => ({
  editingUuid: null,
  tempName: "",

  startEditing: (uuid: string, currentName: string) => set({ editingUuid: uuid, tempName: currentName }),
  changeTempName: (value: string) => set({ tempName: value }),
  stopEditing: () => set({ editingUuid: null, tempName: "" }),
});

export default chatItemsSlice;
