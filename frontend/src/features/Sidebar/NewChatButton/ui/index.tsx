"use client";

import { useSidebarStore } from "@/shared/stores/sidebar";
import Button from "@/shared/ui/Button";
import Link from "next/link";

export default function NewChatButton() {
  const { isOpen } = useSidebarStore();

  return (
    <Link href="/chat" className="flex items-center justify-center w-[230px]">
      <Button label={isOpen ? "+ New chat" : "+"} className="text-[18px] w-[230px]" />
    </Link>
  );
}
