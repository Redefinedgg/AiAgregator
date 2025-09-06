"use client";

import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => (set({ isOpen: isOpen })),
}));
