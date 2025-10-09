export const getColumnsCount = (
  options: {
    isWithSelectedResponse?: boolean;
    proccentOfSecondPart?: number;
  } = {}
): number => {
  const { isWithSelectedResponse = false, proccentOfSecondPart = 100 } =
    options;

  if (typeof window === "undefined") {
    return 5;
  }

  const width = window.innerWidth;

  if (isWithSelectedResponse) {
    if (proccentOfSecondPart < 75) return 1;
    if (proccentOfSecondPart < 100) return 2;
    return 1; // Mobile
  } else {
    if (width >= 2470) return 6; // Desktop large
    if (width >= 2070) return 5; // Desktop
    if (width >= 1680) return 4; // Tablet
    if (width >= 1280) return 3; // Small tablet
    if (width >= 1024) return 2; // Tablet
    return 1; // Mobile
  }
};

export default getColumnsCount;
