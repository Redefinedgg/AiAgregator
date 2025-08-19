"use client";

import { FC, useEffect, useState } from "react";
import { Model } from "@/shared/api/ai/enums";
import Button from "@/shared/ui/Button";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useChatStore } from "@/shared/stores/chat";

interface Props {
  model: Model;
}

const SetCountOfModels: FC<Props> = ({ model }) => {
  const { getCountOfModelsByModel, setSelectedModels, selectedModels } = useChatStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null; // SSR отдаёт пусто, клиент уже отрисует правильное состояние

  const handleCountChange = (plusOrMinus: "plus" | "minus") => {
    let newSelectedModels;
    if (plusOrMinus === "plus") {
      newSelectedModels = [
        ...selectedModels,
        { model, number: getCountOfModelsByModel(model) + 1 },
      ];
    } else {
      const maxNumber = Math.max(
        ...selectedModels.filter((m) => m.model === model).map((m) => m.number)
      );
      let removed = false;
      newSelectedModels = selectedModels.filter((m) => {
        if (!removed && m.model === model && m.number === maxNumber) {
          removed = true;
          return false;
        }
        return true;
      });
    }
    setSelectedModels(newSelectedModels);
  };

  return (
    <div className="flex flex-col items-center gap-[6px]">
      <Button
        label={<FaLongArrowAltUp size={32} />}
        className="flex justify-center items-center text-center w-[32px] h-[32px] p-[0]"
        onClick={() => handleCountChange("plus")}
      />
      <Button
        disabled={getCountOfModelsByModel(model) === 0}
        label={<FaLongArrowAltDown size={32} />}
        className="flex justify-center items-center text-center w-[32px] h-[32px] p-[0]"
        onClick={() => handleCountChange("minus")}
      />
    </div>
  );
};


export default SetCountOfModels;
