import { toast } from "react-toastify";
import axiosInstance from "../client";
import {
  LuckyPromptDto,
  LuckyPromptResponse,
  SendPromptDto,
  SendPromptResponse,
  SmartMergeDto,
  SmartMergeResponse,
} from "./types";
import { Model } from "./enums";

export const sendPrompt = async (
  body: SendPromptDto
): Promise<SendPromptResponse> => {
  try {
    const start = Date.now();

    const response = await axiosInstance.post("/ai/send-prompt", body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const end = Date.now();

    const durationMs = end - start;
    const durationStr = (durationMs / 1000).toFixed(1) + "s";

    return {
      durationMs: durationStr,
      ...response.data,
    };
  } catch (error: any) {
    toast.error(
      error.response.data.message +
        "(response from " +
        body.model +
        " with prompt " +
        body.prompt +
        " not received (error))"
    );
    throw error;
  }
};

export const smartMerge = async (
  body: SmartMergeDto
): Promise<SmartMergeResponse> => {
  try {
    const start = Date.now();

    const response = await axiosInstance.post(
      "/ai/smart-merge",
      {
        ...body,
        model: body.model || Model.gemini_2_5_flash,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const end = Date.now();

    const durationMs = end - start;
    const durationStr = (durationMs / 1000).toFixed(1) + "s";

    return {
      durationMs: durationStr,
      ...response.data,
    };
  } catch (error: any) {
    toast.error(
      error.response.data.message +
        " (smart merge from " +
        body.model +
        " with prompt " +
        body.prompt +
        " not received (error))"
    );
    throw error;
  }
};

export const luckyPrompt = async (
  body: LuckyPromptDto
): Promise<LuckyPromptResponse> => {
  try {
    const response = await axiosInstance.post(
      "/ai/lucky-prompt",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      ...response.data,
    };
  } catch (error: any) {
    toast.error(
      error.response.data.message +
        " (lucky prompt from " +
        body.model +
        " with prompt " +
        body.prompt +
        " not received (error))"
    );
    throw error;
  }
};
