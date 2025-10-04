"use client";

import NewChatButton from "@/features/Sidebar/NewChatButton";
import { useSidebarStore } from "@/shared/stores/sidebar";
import Button from "@/shared/ui/Button";
import ChatList from "./ChatList";

export default function Sidebar() {
  const { isOpen, setIsOpen, widthOfSidebar } = useSidebarStore();

  return (
    <div
      className={`h-screen transition-all duration-300 pl-[10px] pr-[10px] py-[20px] overflow-y-auto ${
        isOpen ? `min-w-[${widthOfSidebar}px] max-w-[250px]` : `w-[${widthOfSidebar}px]`
      }`}
    >
      <Button
        label={isOpen ? "←" : "→"}
        onClick={() => setIsOpen(!isOpen)}
        className="text-[18px] pb-[11px]"
      />

      {isOpen && (
        <div className="flex flex-col gap-[10px] mt-[20px] ">
          <div className="flex items-center justify-center">
            <NewChatButton />
          </div>

          <ChatList />
        </div>
      )}
    </div>
  );
}
