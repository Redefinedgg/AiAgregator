"use client";

import NewChatButton from "@/features/Sidebar/NewChatButton";
import { useSidebarStore } from "@/shared/stores/sidebar";
import Button from "@/shared/ui/Button";
import ChatList from "./ChatList";

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebarStore();

  return (
    <div className={`h-screen transition-all duration-300 pl-[10px] pr-[10px] py-[20px] ${isOpen ? "w-[150px]" : "w-[60px]"}`}>
      <Button label={isOpen ? "←" : "→"} onClick={() => setIsOpen(!isOpen)} className="text-[18px]" />

      {isOpen && (
        <div className="flex flex-col gap-[10px] mt-[65px]">
          <NewChatButton />

          <ChatList />
        </div>
      )}
    </div>
  );
}
