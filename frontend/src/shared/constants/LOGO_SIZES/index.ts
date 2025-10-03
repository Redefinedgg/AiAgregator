export const LOGO_SIZES: Record<
  string,
  { w: number; h: number; className?: string }
> = {
  GPT: { w: 64, h: 64 },
  Claude: { w: 42, h: 42, className: "ml-[0px] mt-[0px]" },
  DeepSeek: { w: 60, h: 60, className: "ml-[2px] mt-[2px]" },
  qwen: {w:64, h: 64, className: "ml-[0px] mt-[0px]" },
  llama: {w:42, h:42, className: "rounded-full" },
  google: {w: 42, h: 42},
  smart_merge: {w: 42, h: 42}
} as const;
