import axiosInstance from "../client";
import { Model } from "./enums";
import { SendPromptDto, SendPromptResponse } from "./types";

export const sendPrompt = async (
  body: SendPromptDto
): Promise<SendPromptResponse> => {
  try {
    const start = Date.now();

    const response = await axiosInstance.post("/ai/send-prompt", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const end = Date.now();

    const durationMs = end - start;
    const durationStr = (durationMs / 1000).toFixed(1) + 's';

    return {
      response: response.data.response,
      spent: response.data.spent,
      durationMs: durationStr,
    };
  } catch (error: any) {
    throw error;
  }
};