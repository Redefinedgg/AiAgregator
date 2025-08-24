import Chat from "@/shared/types/Chat";
import { StateCreator } from "zustand";
import { ChatStore } from "..";

/*import { ChatStore } from "..";
import { StateCreator } from "zustand";

export interface ColumnsSlice {
  columnsCount: number;
  setColumnsCount: (columnsCount: number) => void;
}

export const columns: StateCreator<ChatStore, [], [], ColumnsSlice> = (set) => ({
  columnsCount: 4,
  setColumnsCount: (columnsCount: number) => set({ columnsCount }),
});

export default columns;*/

export interface ChatsSlice {
  // State
  currentChatUuid: string | null;
  chats: Chat[];
  // Actions
  setCurrentChatUuid: (uuid: string | null) => void;
  setChats: (chats: Chat[]) => void;
}

export const chatsSlice: StateCreator<ChatStore, [], [], ChatsSlice> = (set, get, ...args) => ({
  // State
  currentChatUuid: null,
  chats: [],

  // Actions
  setCurrentChatUuid: (uuid: string | null) => set({ currentChatUuid: uuid }),
  setChats: (chats: Chat[]) => set({ chats }),
});

export default chatsSlice;
