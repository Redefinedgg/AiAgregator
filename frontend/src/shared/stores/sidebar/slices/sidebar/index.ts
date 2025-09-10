import { StateCreator } from "zustand";

export interface SidebarSlice {
  isOpen: boolean;
  widthOfSidebar: number;
  setIsOpen: (isOpen: boolean) => void;
  setWidthOfSidebar: (widthOfSidebar: number) => void;
}

export const sidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  isOpen: false,
  widthOfSidebar: 60,

  setIsOpen: (isOpen: boolean) =>
    set({ isOpen: isOpen, widthOfSidebar: isOpen ? 250 : 60 }),
  setWidthOfSidebar: (widthOfSidebar: number) =>
    set({ widthOfSidebar: widthOfSidebar }),
});
