import Chat from "@/shared/types/Chat";
import { StateCreator } from "zustand";
import { ChatStore } from "..";

export interface ChatsSlice {
  // State
  currentChatUuid: string | null;
  chats: Chat[];
  nowDelayted: boolean;
  alreadyUsedUuids: string[];
  alreadyExistingUuids: string[];

  // Actions
  setCurrentChatUuid: (uuid: string | null) => void;
  setChats: (chats: Chat[]) => void;
  setNowDelayted: (nowDelayted: boolean) => void;
  setAlreadyUsedUuids: (alreadyUsedUuids: string[]) => void;
  setAlreadyExistingUuids: (alreadyExistingUuids: string[]) => void;
}

export const chatsSlice: StateCreator<ChatStore, [], [], ChatsSlice> = (
  set,
  get,
  ...args
) => ({
  // State
  currentChatUuid: null,
  chats: [],
  nowDelayted: false,
  alreadyUsedUuids: [],
  alreadyExistingUuids: [],

  // Actions
  setCurrentChatUuid: (uuid: string | null) => set({ currentChatUuid: uuid }),
  setChats: (chats: Chat[]) => set({ chats: chats }),
  setNowDelayted: (nowDelayted: boolean) => set({ nowDelayted }),
  setAlreadyUsedUuids: (alreadyUsedUuids: string[]) =>
    set({ alreadyUsedUuids }),
  setAlreadyExistingUuids: (alreadyExistingUuids: string[]) =>
    set({ alreadyExistingUuids }),
  addAlreadyUsedUuid: (uuid: string) =>
    set((state) => ({ alreadyUsedUuids: [...state.alreadyUsedUuids, uuid] })),
});

export default chatsSlice;
