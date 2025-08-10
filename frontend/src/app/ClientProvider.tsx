"use client";

import useScreenSize from "@/shared/hooks/useScreenSize";

export default function ClientProvider() {
  useScreenSize();
  return null;
}