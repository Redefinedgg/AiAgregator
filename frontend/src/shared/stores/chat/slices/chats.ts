import Chat from "@/shared/types/Chat";
import { StateCreator } from "zustand";
import { ChatStore } from "..";
import Message from "@/shared/types/Message";

export interface ChatsSlice {
  // State
  currentChatUuid: string | null;
  chats: Chat[];
  nowDelayted: boolean;
  alreadyUsedUuids: string[];

  // Actions
  setCurrentChatUuid: (uuid: string | null) => void;
  setChats: (chats: Chat[]) => void;
  setNowDelayted: (nowDelayted: boolean) => void;
  setAlreadyUsedUuids: (alreadyUsedUuids: string[]) => void;
  setChatMessages: (chatUuid: string, messages: Message[]) => void;
}

export const chatsSlice: StateCreator<ChatStore, [], [], ChatsSlice> = (set, get, ...args) => ({
  // State
  currentChatUuid: null,
  chats: [],
  nowDelayted: false,
  alreadyUsedUuids: [],

  // Actions
  setCurrentChatUuid: (uuid: string | null) => set({ currentChatUuid: uuid }),
  setChats: (chats: Chat[]) => set({
    chats: chats.map((chat) => ({
      ...chat,
      messages: chat.messages ?? [],
    }))
  }),
  setNowDelayted: (nowDelayted: boolean) => set({ nowDelayted }),
  setAlreadyUsedUuids: (alreadyUsedUuids: string[]) => set({ alreadyUsedUuids }),
  addAlreadyUsedUuid: (uuid: string) => set((state) => ({ alreadyUsedUuids: [...state.alreadyUsedUuids, uuid] })),

  setChatMessages: (chatUuid: string, messages: Message[]) => set((state) => ({
    chats: state.chats.map((chat) => chat.uuid === chatUuid ? { ...chat, messages } : chat)
  }))
});

export default chatsSlice;
