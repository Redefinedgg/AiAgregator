import ReactMarkdown from "react-markdown";
import { FC } from "react";

interface Props {
  response: string;
}

const ChatResponseText: FC<Props> = ({ response }) => {
  return (
    <div className="flex-1 text-gray-700 text-sm leading-relaxed overflow-y-auto relative">
      <div className="h-full text-gray-700">
        <div className="prose prose-sm max-w-none h-full p-[8px] overflow-auto">
          <ReactMarkdown className="prose prose-sm max-w-none whitespace-pre-wrap break-words px-[20px]">
            {response}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatResponseText;
