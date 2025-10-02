import { StateCreator } from "zustand";
import { ChatStore } from "..";

export interface ChatTitleSlice {
  editingHeader: string | null;
  tempHeaderName: string;
  startEditingHeader: (currentName: string) => void;
  changeTempHeaderName: (value: string) => void;
  stopEditingHeader: () => void;
}

export const chatTitleSlice: StateCreator<ChatStore, [], [], ChatTitleSlice> = (
  set,
  get,
  ...args
) => ({
  editingHeader: null,
  tempHeaderName: "",

  startEditingHeader: (currentName: string) => set({ editingHeader: get().currentChatUuid, tempHeaderName: currentName }),
  changeTempHeaderName: (value: string) => set({ tempHeaderName: value }),
  stopEditingHeader: () => set({ editingHeader: null, tempHeaderName: "" }),
});

export default chatTitleSlice;
