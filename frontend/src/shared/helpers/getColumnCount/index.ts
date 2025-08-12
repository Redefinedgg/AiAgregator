export const getColumnsCount = (width: number) => {
    if (typeof window !== "undefined") {
      if (width >= 2470) return 6; // Desktop large
      else if (width >= 2070) return 5; // Desktop
      else if (width >= 1680) return 4;  // Tablet
      else if (width >= 1280) return 3;  // Small tablet
      else if (width >= 1024) return 2;  // Tablet
      else return 1; // Mobile
    }
    return 5; // Default
  };