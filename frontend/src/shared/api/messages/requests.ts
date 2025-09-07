import axiosInstance from "../client";
import { toast } from "react-toastify";
import { CreateMessageDto } from "../messages/types";

export const createNewMessage = async (body: CreateMessageDto) => {
  try {
    const response = await axiosInstance.post("/messages", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body,
    });

    return response;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message + " (Failed to create new message)"
    );
    throw error;
  }
};
