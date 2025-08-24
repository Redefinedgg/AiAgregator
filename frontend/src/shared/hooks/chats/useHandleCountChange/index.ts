import { Model } from "@/shared/api/ai/enums";
import { useChatStore } from "@/shared/stores/chat";
import { toast } from "react-toastify";

const useHandleCountChange = () => {
  const { selectedModels, setSelectedModels, getCountOfModelsByModel } =
    useChatStore();

  const handleCountChange = (plusOrMinus: "plus" | "minus", model: Model) => {
    let newSelectedModels;
    if (plusOrMinus === "plus") {

      if (selectedModels.length === 99) {
        toast.error("You can't add more than 99 models");
        return;
      }

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

  return { handleCountChange };
};

export default useHandleCountChange;
