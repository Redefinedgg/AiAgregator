"use client";

import { create } from "zustand";
import { SidebarSlice, sidebarSlice } from "./slices/sidebar";

interface SidebarStore extends SidebarSlice {}

export const useSidebarStore = create<SidebarStore>((set, get, ...args) => ({
  ...sidebarSlice(set, get, ...args),
}));
