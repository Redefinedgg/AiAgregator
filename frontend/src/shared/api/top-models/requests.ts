import axiosInstance from "../client";
import { TopModelsResponse } from "./types";
import { toast } from "react-toastify";

export const getTopModels = async (period?: string): Promise<TopModelsResponse> => {
  try {
    const response = await axiosInstance.get(`/statistic/top-model${period ? `?period=${period}` : ""}`);
    return response.data
  } catch (err: any) {
    toast.error(
      err.response?.data?.message + " (Failed to get top models)"
    );
    throw err;
  }
}
