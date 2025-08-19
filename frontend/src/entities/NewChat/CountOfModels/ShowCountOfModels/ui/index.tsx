import { FC, useEffect, useState } from "react";
import { Model } from "@/shared/api/ai/enums";
import { useChatStore } from "@/shared/stores/chat";

interface Props {
  model: Model;
}

const ShowCountOfModels: FC<Props> = ({ model }) => {
  const [isClient, setIsClient] = useState(false);
  const {getCountOfModelsByModel} = useChatStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (getCountOfModelsByModel(model) === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-[6px] bg-[#070708] text-[#E9E9E9] border border-[#E9E9E9] rounded-[25px] w-[25px] h-[25px] absolute top-[4px] right-[36px]">
      {getCountOfModelsByModel(model)}
    </div>
  );
};

export default ShowCountOfModels;
