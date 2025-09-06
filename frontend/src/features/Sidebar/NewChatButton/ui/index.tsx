"use client";

import { useSidebarStore } from "@/shared/stores/sidebar";
import Button from "@/shared/ui/Button";

export default function NewChatButton() {
  const { isOpen } = useSidebarStore();

  return (
    <Button label={isOpen ? "+ New chat" : "+"} className="text-[18px]" />
  );
}
