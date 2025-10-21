import axiosInstance from "../client";
import { Period } from "./enums";
import { LeaderboardResponse } from "./types";
import { toast } from "react-toastify";

export const getLeaderboard = async (period: Period | string): Promise<LeaderboardResponse> => {
  try {
    const response = await axiosInstance.get(`/statistic/leaderboard${period ? `?period=${period}` : ""}`);
    console.log(response.data);
    return response.data
  } catch (err: any) {
    toast.error(
      err.response?.data?.message + " (Failed to get leaderboard)"
    );
    throw err;
  }
}
