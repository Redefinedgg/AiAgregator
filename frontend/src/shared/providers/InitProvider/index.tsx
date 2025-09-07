"use client";

import { useFetchChatsData } from "@/shared/hooks/chats/useFetchChatsData";

type Props = {
  children: React.ReactNode;
}

export default function InitProvider({ children }: Props) {
  useFetchChatsData();

  return <>{children}</>;
}
