import axiosInstance from "../client";
import { toast } from "react-toastify";
import { CreateMessagesDto, CreateMessagesResponse } from "../messages/types";

export const createNewMessages = async (body: CreateMessagesDto): Promise<CreateMessagesResponse> => {
  try {
    console.log("create new messages start")
    const response = await axiosInstance.post("/messages", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log("create new messages finish")
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.message + " (Failed to create new message)"
    );
    throw error;
  }
};
