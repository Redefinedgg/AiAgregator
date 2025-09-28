import axiosInstance from "../client";
import { toast } from "react-toastify";
import { CreateChatDto, GetChatByUuidResponse, GetChatMessagesByChatUuidResponse } from "./types";
import { ChatsResponse } from "@/shared/types/ChatsResponse";

export const createChat = async (body: CreateChatDto) => {
  try {
    const response = await axiosInstance.post("/chats", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message + " (Failed with create new chat)"
    );
    throw error;
  }
};

export const getChats = async (): Promise<ChatsResponse> => {
  try {
    const response = await axiosInstance.get("/chats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  } catch (err: any) {
    toast.error(err.response?.data?.message + " (Failed with get all chats)");
    throw err;
  }
};

export const getChatByUuid = async (uuid: string): Promise<GetChatByUuidResponse | null> => {
  try {
    const response = await axiosInstance.get(`/chats/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null;
    }
    toast.error(err.response?.data?.message + " (Failed to get chat by UUID)");
    throw err;
  }
};

export const getChatMessagesByChatUuid = async (uuid: string): Promise<GetChatMessagesByChatUuidResponse | null> => {
  try {
    const response = await axiosInstance.get(`/chats/${uuid}/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null;
    }
    toast.error(
      err.response?.data?.message +
      " (Failed to get chat messages by chat UUID)"
    );
    throw err;
  }
};
