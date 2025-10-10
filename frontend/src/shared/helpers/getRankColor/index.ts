export const getRankColor = (rank: number): string => {
  const color = (color: string) => `drop-shadow-[0_0_10px_${color}]`;
  switch (rank) {
    case 1:
      return color("gold");
    case 2:
      return color("silver");
    case 3:
      return color("#CD7F32");
    default:
      return color("black");
  }
}
