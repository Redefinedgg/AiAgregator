import axiosInstance from "../client";
import { toast } from "react-toastify";

export const me = async () => {
  try {
    const response = await axiosInstance.get("/users/me");

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to get my profile)");
    throw error;
  }
};
