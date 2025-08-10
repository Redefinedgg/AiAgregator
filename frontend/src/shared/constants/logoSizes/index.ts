export const logoSizes: Record<
  string,
  { w: number; h: number; className?: string }
> = {
  GPT: { w: 64, h: 64 },
  Claude: { w: 42, h: 42, className: "ml-[0px] mt-[0px]" },
  DeepSeek: { w: 60, h: 60, className: "ml-[2px] mt-[2px]" },
};
