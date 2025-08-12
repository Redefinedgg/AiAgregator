// src/ai/ai.constants.ts
export const SYSTEM_PROMPT = `
You are a helpful assistant. You will answer in language of user.
You will answer in a simple way.
You will answer in a way that is easy to understand.
You will answer in a way that is easy to read.
`;

export const TOKEN_PRICES_GPT_3_5_TURBO = {
  prompt: 0.5 / 1_000_000, // 0.50$ за 1 млн токенов
  completion: 1.5 / 1_000_000, // 1.50$ за 1 млн токенов
  markup: 10,
};

export const TOKEN_PRICES_CLAUDE_SONNET_4_0 = {
  prompt: 3 / 1_000_000, // 3$ за 1 млн токенов
  completion: 15 / 1_000_000, // 15$ за 1 млн токенов
  markup: 10,
};

export const TOKEN_PRICES_GPT_4O_MINI = {
  prompt: 0.15 / 1_000_000, // 0.50$ за 1 млн токенов
  completion: 0.6 / 1_000_000, // 1.50$ за 1 млн токенов
  markup: 10,
};
