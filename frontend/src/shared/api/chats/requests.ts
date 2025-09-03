import axiosInstance from "../client";
import { toast } from "react-toastify";
import { CreateChatDto } from "./types";

export const createChat = async (body: CreateChatDto) => {
  try {
    const response = await axiosInstance.post("/chats", body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      }
    );

    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to create new chat)");
    throw error;
  }
};
