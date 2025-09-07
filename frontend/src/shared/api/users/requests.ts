import axiosInstance from "../client";
import { toast } from "react-toastify";
import { MeResponse, UpdateUserDto } from "./types";

export const me = async (): Promise<MeResponse> => {
  try {
    const response = await axiosInstance.get("/users/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
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
