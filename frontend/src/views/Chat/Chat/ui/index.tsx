import { FC, useEffect, useRef } from "react";
import ChatResponses from "@/widgets/Chat/ChatResponses";
import ChatWithoutResponses from "@/features/Chat/ChatWithoutResponses";
import { useChatStore } from "@/shared/stores/chat";
import { useValidateModels } from "@/shared/hooks/ai/useValidateModels";
import { toast } from "react-toastify";
import { sendPrompt } from "@/shared/api/ai/requests";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { createNewMessages } from "@/shared/api/messages/requests";
import {
  createChat,
  getChatByUuid,
  getChatMessagesByChatUuid,
} from "@/shared/api/chats/requests";
import { useAuthStore } from "@/shared/stores/auth";
import { CreateMessageDto } from "@/shared/api/messages/types";
import ChatTitle from "@/features/Chat/ChatTitle";
import { v4 as uuidv4 } from "uuid";
import ChatSelectedResponse from "@/features/Chat/ChatSelectedResponse";
import ChatResizableParts from "@/features/Chat/ChatResizableParts";
import { useGenerateChatName } from "@/shared/hooks/chats/useGenerateChatName";

const ChatView: FC = () => {
  const {
    chatResponses,
    setChatResponses,
    promptWithoutResponse,
    currentChatUuid,
    chats,
    setChats,
    selectedResponse,
  } = useChatStore();
  const { user } = useAuthStore();
  const { validateModels } = useValidateModels();
  const { generateChatName } = useGenerateChatName();
  const runIdRef = useRef(0);

  useEffect(() => {
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

      let chatExists = false;
      try {
        const chat = await getChatByUuid(currentChatUuid);
        if (chat) chatExists = true;
      } catch (err) {
        console.error("Error fetching chat: ", err);
      }

      if (!chatExists) {
        try {
          const newChat = await createChat({ user, uuid: currentChatUuid });
          setChats([newChat.chat, ...chats]);
        } catch (err) {
          console.error("createChat error", err);
          return;
        }
      } else {
        try {
          const oldMessages = await getChatMessagesByChatUuid(currentChatUuid);
          if (oldMessages?.messages) {
            const mappedMessages = oldMessages.messages.map((m) => ({
              id: m.id,
              model: m.model,
              number: m.number,
              timeOfResponse: m.timeOfResponse,
              logo: getLogoFromModel(m.model),
              response: m.response,
              spent: m.spent,
              uuid: m.uuid,
              isSmartMerge: m.isSmartMerge,
            }));

            const orderedMessages = [
              ...mappedMessages.filter((m) => m.isSmartMerge),
              ...mappedMessages.filter((m) => !m.isSmartMerge),
            ];

            if (orderedMessages.length > 0) {
              setChatResponses(orderedMessages);
            }
            return;
          }
        } catch (err) {
          console.error("getChatMessagesByChatUuid error", err);
        }
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

      const responsesPlaceholder = validModels.map((model, index) => ({
        id: Date.now() + index,
        model: model.model,
        number: model.number,
        timeOfResponse: "",
        logo: getLogoFromModel(model.model),
        response: "Wait for response...",
        spent: 0,
        uuid: uuidv4(),
      }));

      setChatResponses(responsesPlaceholder);

      const updateSingleResponse = (id: string | number, partial: any) => {
        if (runIdRef.current !== runId || isUnmounted) return;
        const state = useChatStore.getState();
        const current = state.chatResponses || [];
        const exists = current.some((r: any) => r.id === id);
        const next = exists
          ? current.map((r: any) => (r.id === id ? { ...r, ...partial } : r))
          : [...current, { id, ...partial }];
        state.setChatResponses(next);
      };

      const promises = validModels.map((model, index) =>
        (async () => {
          try {
            const response = await sendPrompt({
              prompt: promptWithoutResponse,
              model: model.model,
            });

            if (runIdRef.current !== runId || isUnmounted) return null;

            const updatedResponse = {
              id: responsesPlaceholder[index].id,
              model: model.model,
              number: model.number,
              timeOfResponse: response?.durationMs ?? "",
              logo: getLogoFromModel(model.model),
              response: response?.response ?? "",
              spent: response?.spent ?? 0,
            };

            updateSingleResponse(
              responsesPlaceholder[index].id,
              updatedResponse
            );
            return updatedResponse;
          } catch (error) {
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

      try {
        const allResponses: CreateMessageDto[] = (
          await Promise.all(promises)
        ).filter(Boolean) as CreateMessageDto[];
        if (runIdRef.current === runId && !isUnmounted && currentChatUuid) {
          try {
            await createNewMessages({
              messages: allResponses,
              chatUuid: currentChatUuid,
            });
          } catch (err) {
            console.error("createNewMessages error", err);
          }
        }
      } catch (err) {
        console.error("Error waiting for responses:", err);
      }

      try {
        await generateChatName(promptWithoutResponse, currentChatUuid);
      } catch (err) {
        console.error("Error generating chat name:", err);
      }
    };

    chatProcess();

    return () => {
      isUnmounted = true;
      runIdRef.current += 1;
    };
  }, [
    promptWithoutResponse,
    currentChatUuid,
    user,
    setChatResponses,
    validateModels,
  ]);

  return (
    <>
      <ChatTitle />
      <ChatResponses />
    </>
  );
};

export default ChatView;
