// components/ChatView.tsx
import { FC, useEffect, useRef } from "react";
import ChatResponses from "@/widgets/Chat/ChatResponses";
import ChatWithoutResponses from "@/widgets/Chat/ChatWithoutResponses";
import { useChatStore } from "@/shared/stores/chat";
import { useValidateModels } from "@/shared/hooks/ai/useValidateModels";
import { toast } from "react-toastify";
import { sendPrompt } from "@/shared/api/ai/requests";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { createNewMessages } from "@/shared/api/messages/requests";
import { createChat } from "@/shared/api/chats/requests";
import { useAuthStore } from "@/shared/stores/auth";
import { CreateMessageDto } from "@/shared/api/messages/types";

const makeId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const ChatView: FC = () => {
  const { chatResponses, setChatResponses, promptWithoutResponse, currentChatUuid } =
    useChatStore();
  const { user } = useAuthStore();
  const { validateModels } = useValidateModels();
  const runIdRef = useRef(0);

  useEffect(() => {
    // increment run id - any in-flight responses from previous runs will be ignored
    runIdRef.current += 1;
    const runId = runIdRef.current;
    let isUnmounted = false;

    const chatProcess = async () => {
      if (!currentChatUuid) {
        toast.error("No chat UUID");
        return;
      }
      if (!user) {
        toast.error("No user");
        return;
      }

      try {
        await createChat({ user: user, uuid: currentChatUuid });
      } catch (err) {
        console.error("createChat error", err);
      }

      if (!promptWithoutResponse) {
        toast.error("No prompt");
        return;
      }

      const validModels = validateModels();
      if (!validModels || validModels.length === 0) {
        toast.error("No valid models");
        return;
      }

      // stable placeholders for this run
      const responsesPlaceholder = validModels?.map((model, index) => ({
        id: Date.now() + index, // теперь number, как требует ChatResponse
        model: model.model,
        number: model.number,
        timeOfResponse: "",
        logo: getLogoFromModel(model.model),
        response: "Wait for response...",
        spent: 0,
      })) ?? [];
      

      // show placeholders immediately (replaces previous UI)
      setChatResponses(responsesPlaceholder);

      // helper: update single response using the current store state (avoids stale closures)
      const updateSingleResponse = (id: string | number, partial: any) => {
        // ignore if run is stale
        if (runIdRef.current !== runId || isUnmounted) return;

        const state = useChatStore.getState();
        const current = state.chatResponses || [];
        const exists = current.some((r: any) => r.id === id);
        const next = exists
          ? current.map((r: any) => (r.id === id ? { ...r, ...partial } : r))
          : [...current, { id, ...partial }];

        // call setter from the store (setChatResponses expects an array)
        state.setChatResponses(next);
      };

      // fire all requests in parallel but update UI as each arrives
      const promises = validModels.map((model, index) =>
        (async () => {
          try {
            console.log(`Sending request to model: ${model.model}`);
            const response = await sendPrompt({
              prompt: promptWithoutResponse,
              model: model.model,
            });

            if (runIdRef.current !== runId || isUnmounted) {
              console.log(`Ignored response from ${model.model} (stale run)`);
              return null;
            }

            const updatedResponse = {
              id: responsesPlaceholder[index].id,
              model: model.model,
              number: model.number,
              timeOfResponse: response?.durationMs ?? "",
              logo: getLogoFromModel(model.model),
              response: response?.response ?? "",
              spent: response?.spent ?? 0,
            };

            updateSingleResponse(responsesPlaceholder[index].id, updatedResponse);
            console.log(`Response received from ${model.model}:`, updatedResponse);

            return updatedResponse;
          } catch (error) {
            console.error(`Error from ${model.model}:`, error);

            if (runIdRef.current !== runId || isUnmounted) return null;

            const errorResponse = {
              id: responsesPlaceholder[index].id,
              model: model.model,
              number: model.number,
              timeOfResponse: "Error",
              logo: getLogoFromModel(model.model),
              response: "Error occurred while getting response",
              spent: 0,
            };

            updateSingleResponse(responsesPlaceholder[index].id, errorResponse);
            return errorResponse;
          }
        })()
      );

      // wait for all to finish (only needed if you want to save them in bulk)
      try {
        const allResponses: CreateMessageDto[] = (await Promise.all(promises)).filter(Boolean) as CreateMessageDto[];

        if (runIdRef.current === runId && !isUnmounted && currentChatUuid) {
          try {
            await createNewMessages({ messages: allResponses, chatUuid: currentChatUuid });
            console.log("Messages saved successfully");
          } catch (err) {
            console.error("createNewMessages error", err);
          }
        }
      } catch (err) {
        console.error("Error waiting for responses:", err);
      }
    };

    chatProcess();

    return () => {
      isUnmounted = true;
      runIdRef.current += 1; // mark run stale
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptWithoutResponse]);

  return (
    <section className="w-full p-[12px]">
      {chatResponses.length > 0 ? <ChatResponses /> : <ChatWithoutResponses />}
    </section>
  );
};

export default ChatView;
