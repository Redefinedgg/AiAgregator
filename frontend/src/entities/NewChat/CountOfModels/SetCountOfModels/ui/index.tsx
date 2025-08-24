"use client";

import { FC, useEffect, useState } from "react";
import { Model } from "@/shared/api/ai/enums";
import Button from "@/shared/ui/Button";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useChatStore } from "@/shared/stores/chat";
import useHandleCountChange from "@/shared/hooks/chats/useHandleCountChange";

interface Props {
  model: Model;
}

const SetCountOfModels: FC<Props> = ({ model }) => {
  const { getCountOfModelsByModel } = useChatStore();
  const [isClient, setIsClient] = useState(false);
  const { handleCountChange } = useHandleCountChange();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null; // SSR отдаёт пусто, клиент уже отрисует правильное состояние

  return (
    <div className="flex flex-col items-center gap-[6px]">
      <Button
        label={<FaLongArrowAltUp size={32} />}
        className="flex justify-center items-center text-center w-[32px] h-[32px] p-[0]"
        onClick={() => handleCountChange("plus", model)}
      />
      <Button
        disabled={getCountOfModelsByModel(model) === 0}
        label={<FaLongArrowAltDown size={32} />}
        className="flex justify-center items-center text-center w-[32px] h-[32px] p-[0]"
        onClick={() => handleCountChange("minus", model)}
      />
    </div>
  );
};

export default SetCountOfModels;
