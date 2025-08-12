export class SendPromptResponse {
  id: number;
  response: string;
  spent: number;
}

export class SendPromptsResponse {
  responses: SendPromptResponse[];
  spent: number;
}
