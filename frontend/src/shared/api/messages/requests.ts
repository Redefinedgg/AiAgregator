import axiosInstance from "../client";
import { toast } from "react-toastify";
import { CreateMessagesDto } from "../messages/types";

export const createNewMessages = async (body: CreateMessagesDto) => {
  try {
    const response = await axiosInstance.post("/messages", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message + " (Failed to create new message)"
    );
    throw error;
  }
};
