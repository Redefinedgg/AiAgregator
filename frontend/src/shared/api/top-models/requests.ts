import axiosInstance from "../client";
import { Period } from "./enums";
import { TopModelsResponse } from "./types";
import { toast } from "react-toastify";

export const getTopModels = async (period: Period | string): Promise<TopModelsResponse> => {
  try {
    const response = await axiosInstance.get(`/statistic/top-models${period ? `?period=${period}` : ""}`);
    console.log(response.data);
    return response.data
  } catch (err: any) {
    toast.error(
      err.response?.data?.message + " (Failed to get top models)"
    );
    throw err;
  }
}
