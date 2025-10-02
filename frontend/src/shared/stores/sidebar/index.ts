"use client";

import { SidebarSlice, sidebarSlice } from "./slices/sidebar";
import { createPersistedStore } from "@/shared/helpers/createPersistedStore";

interface SidebarStore extends SidebarSlice { }

export const useSidebarStore = createPersistedStore<SidebarStore>(
  "sidebarStore",
  (set, get, ...args) => ({
    ...sidebarSlice(set, get, ...args),
  })
);
