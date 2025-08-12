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
  