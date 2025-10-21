"use client";

import ChatTitleButtons from "../../../../entities/Chat/ChatTitleButtons";
import ChatTitleEntity from "../../../../entities/Chat/ChatTitle";
import ChatTitleContext from "@/entities/Chat/ChatTitleContext";

export default function ChatTitle() {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="flex items-center gap-[12px] w-full">
        <div className="flex justify-between items-center w-full">
          <ChatTitleEntity />
          <ChatTitleButtons />
        </div>
      </div>
      <ChatTitleContext />
    </div>
  );
}
