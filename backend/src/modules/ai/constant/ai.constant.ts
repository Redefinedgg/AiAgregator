// src/constant/ai.constant.ts
export const SYSTEM_PROMPT = `
You are a helpful assistant. You will answer in language of user.
You will answer in a simple way.
You will answer in a way that is easy to understand.
You will answer in a way that is easy to read.
`;

// OpenAI
export const TOKEN_PRICES_GPT_3_5_TURBO = {
  prompt: 0.5 / 1_000_000 + (0.5 / 1_000_000 /100) * 20,    // $0.50 за 1M токенов (ввод)
  completion: 1.5 / 1_000_000 + (1.5 / 1_000_000 /100) * 20, // $1.50 за 1M токенов (вывод)
};

export const TOKEN_PRICES_GPT_4O_MINI = {
  prompt: 0.15 / 1_000_000 + (0.15 / 1_000_000 /100) * 20,    // $0.15 за 1M токенов
  completion: 0.6 / 1_000_000 + (0.6 / 1_000_000 /100) * 20,  // $0.60 за 1M токенов
};

// Anthropic
export const TOKEN_PRICES_CLAUDE_SONNET_4_0 = {
  prompt: 3 / 1_000_000 + (3 / 1_000_000 /100) * 20,       // $3.00 за 1M токенов
  completion: 15 / 1_000_000 + (15 / 1_000_000 /100) * 20,   // $15.00 за 1M токенов
};

// DeepSeek (только Chat)
export const TOKEN_PRICES_DEEPSEEK_CHAT = {
  prompt: 0.27 / 1_000_000 + (0.27 / 1_000_000 /100) * 20,    // $0.27 за 1M токенов (cache miss)
  completion: 1.10 / 1_000_000 + (1.10 / 1_000_000 /100) * 20, // $1.10 за 1M токенов
  contextLength: 64_000,        // 64K контекст
  maxOutput: 8_000,            // 8K токенов (макс. вывод)
};