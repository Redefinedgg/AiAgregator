import Message from "@/shared/types/Message";
import { Model } from "./enums";

export interface SendPromptDto {
  prompt: string;
  model: Model;
}

export interface SendPromptsDto {
  prompt: string;
  models: Model[];
}

export interface SendPromptResponse {
  response: string;
  spent: number;
  durationMs: string;
}

export interface SendPromptsResponse {
  responses: SendPromptResponse[];
  spent: number;
  durationMs: string;
}
  
export interface SmartMergeDto {
  prompt: string;
  model?: Model;
  messages: string[];
  chatUuid: string;
  number: number;
}

export interface SmartMergeResponse {
  response: string;
  durationMs: string;
}

export interface LuckyPromptDto {
  prompt?: string;
  model?: Model;
}

export interface LuckyPromptResponse {
  response: string;
}

