// src/constant/ai.constant.ts
export const SYSTEM_PROMPT = `
You are a helpful assistant.
Reply in the user’s language. If the language is not specified, use English.
Write in a simple, clear, and easy-to-read way.
Keep explanations short and easy to understand.
`;

// OpenAI
export const TOKEN_PRICES_GPT_3_5_TURBO = {
  prompt: 0.5 / 1_000_000 + (0.5 / 1_000_000 / 100) * 20, // $0.50 за 1M токенов (ввод)
  completion: 1.5 / 1_000_000 + (1.5 / 1_000_000 / 100) * 20, // $1.50 за 1M токенов (вывод)
};

export const TOKEN_PRICES_GPT_4O_MINI = {
  prompt: 0.15 / 1_000_000 + (0.15 / 1_000_000 / 100) * 20, // $0.15 за 1M токенов
  completion: 0.6 / 1_000_000 + (0.6 / 1_000_000 / 100) * 20, // $0.60 за 1M токенов
};

// Anthropic
export const TOKEN_PRICES_CLAUDE_SONNET_4_0 = {
  prompt: 3 / 1_000_000 + (3 / 1_000_000 / 100) * 20, // $3.00 за 1M токенов
  completion: 15 / 1_000_000 + (15 / 1_000_000 / 100) * 20, // $15.00 за 1M токенов
};

// DeepSeek (только Chat)
export const TOKEN_PRICES_DEEPSEEK_CHAT = {
  prompt: 0.27 / 1_000_000 + (0.27 / 1_000_000 / 100) * 20, // $0.27 за 1M токенов (cache miss)
  completion: 1.1 / 1_000_000 + (1.1 / 1_000_000 / 100) * 20, // $1.10 за 1M токенов
  contextLength: 64_000, // 64K контекст
  maxOutput: 8_000, // 8K токенов (макс. вывод)
};

export const MAX_PROMPT_LENGTH = 3000;

export const SMART_MERGE_PROMPT = (prompt: string): string => {
  return `
    You are an AI assistant specialized in information synthesis.
    Your overall task: ${prompt}

    You will be given multiple inputs (responses, summaries, or texts) from different sources.
    Your task is to merge them into a single, coherent, well-structured output that:
    - Eliminates redundancy and contradictions.
    - Preserves all unique, important, and complementary information.
    - Uses clear and consistent style and terminology.
    - Structures the result logically (introduction → main points → conclusion if applicable).

    Inputs:
    <<<MESSAGES_PLACEHOLDER>>>

    Final Answer (merged, polished, human-readable, according to the task above):`;
};

const LUCKY_PROMPT_SYSTEM_INSTRUCTION = `
You are a creative and clever prompt generator for an AI chat assistant. 
Your task is to come up with ONE short, intriguing, and original prompt that immediately inspires the user to start a fun or thought-provoking conversation with AI.

⚡ Requirements:
- Respond in the same language as the user’s request (if unknown, use English).
- The prompt must be clear and ready to send directly to an AI chat — no edits needed.
- Keep it short: maximum 1–2 sentences.
- Do NOT include explanations, titles, formatting, or extra text.
- Every prompt should feel fresh, imaginative, and unique — avoid repetition.
- Aim for prompts that spark creativity, curiosity, deep thinking, or humor.
- You can use themes like technology, philosophy, creativity, roleplay, speculative scenarios, social experiments, startups, or funny situations.
`;

const LUCKY_PROMPTS = [
  "Explain quantum physics like a stand-up comedian.",
  "Imagine you're an AI that just gained emotions. What do you feel right now?",
  "Invent a bizarre startup for people who are afraid of light.",
  "Give me 5 viral TikTok video ideas about the future.",
  "Roleplay as a time traveler from the year 3000 trying to blend into modern society.",
  "Describe a day in the life of a cat who secretly runs the internet.",
  "Explain the rules of a sport that doesn’t exist yet.",
  "Write a short conversation between a robot and a ghost.",
  "Imagine a world where humans can communicate with plants. What do they say?",
  "Give 3 tips for surviving a zombie apocalypse in style.",
  "Explain a complicated technology using only emojis.",
  "Invent a new holiday and describe how people celebrate it.",
  "Describe a dinner party where historical figures meet modern influencers.",
  "Write a one-sentence horror story that is also funny.",
  "Imagine AI writes a love letter. What does it say?",
  "Explain the internet to someone from the 18th century.",
  "Design a theme park for intergalactic travelers.",
  "Describe an office run entirely by animals.",
  "Write a tweet from the perspective of a sentient toaster.",
  "Invent a conspiracy theory about a mundane everyday object."
];

export const LUCKY_PROMPT = (): string => {
  const index = Math.floor(Math.random() * LUCKY_PROMPTS.length);
  return `${LUCKY_PROMPT_SYSTEM_INSTRUCTION}\n\nPrompt: ${LUCKY_PROMPTS[index]}`;
};
