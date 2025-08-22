import axiosInstance from "../client";
import { toast } from "react-toastify";
import { UpdateUserDto } from "./types";

export const me = async () => {
  try {
    const response = await axiosInstance.get("/users/me");

    return response;
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to get my profile)");
    throw error;
  }
};

export const updateMe = async (body: UpdateUserDto) => {
  try {
    const response = await axiosInstance.put("/users/me", body);

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message + " (Failed to update my profile)");
    throw error;
  }
};
