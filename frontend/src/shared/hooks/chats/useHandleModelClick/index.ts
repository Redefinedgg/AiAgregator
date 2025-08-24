import models from "@/shared/constants/MODELS";
import { SelectedModel, useChatStore } from "@/shared/stores/chat";
import { Model } from "@/shared/api/ai/enums";

const useHandleModelClick = () => {
  const { selectedModels, setSelectedModels, setSelectedModelsCount } =
    useChatStore();

  const handleModelClick = (model: Model) => {
    let updatedModels: SelectedModel[];
    if (selectedModels.some((m) => m.model === model)) {
      updatedModels = selectedModels.filter((m) => m.model !== model);
    } else {
      updatedModels = [...selectedModels, { model, number: 1 }];
    }
    setSelectedModels(updatedModels);

    const newCounts = models.map((m) => ({
      model: m.value,
      count: updatedModels.filter((sm) => sm.model === m.value).length,
    }));
    setSelectedModelsCount(newCounts);
  };

  return { handleModelClick };
};

export default useHandleModelClick;
