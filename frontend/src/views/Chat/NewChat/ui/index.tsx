"use client";
import NewChatAIChoiceButtons from "@/widgets/NewChat/NewChatAIChoiceButtons";
import NewChatTitle from "@/widgets/NewChat/NewChatTitle";
import NewChatTextarea from "@/widgets/NewChat/NewChatTextarea";

const NewChatView = () => {

  return (
    <main className="flex flex-col items-center mt-[calc(50vh-45vh)] w-full relative">
      <NewChatTitle />
      <NewChatTextarea />
      <NewChatAIChoiceButtons />
    </main>
  );
};

export default NewChatView;
