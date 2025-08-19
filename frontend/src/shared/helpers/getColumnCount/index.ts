export const getColumnsCount = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 2470) return 6; // Desktop large
    else if (window.innerWidth >= 2070) return 5; // Desktop
    else if (window.innerWidth >= 1680) return 4; // Tablet
    else if (window.innerWidth >= 1280) return 3; // Small tablet
    else if (window.innerWidth >= 1024) return 2; // Tablet
    else return 1; // Mobile
  }
  return 5; // Default
};

export default getColumnsCount;
