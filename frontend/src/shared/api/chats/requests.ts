import axiosInstance from "../client";
import { toast } from "react-toastify";
import { CreateChatDto } from "./types";

export const createChat = async (body: CreateChatDto) => {
  try {
    const response = await axiosInstance.post("/chats", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: {
        uuid: body.uuid,
      }
    });

    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to create new chat)");
    throw error;
  }
};
