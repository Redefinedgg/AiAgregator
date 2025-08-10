"use client";

import { useScreenStore } from "@/shared/stores/screen";
import { useEffect } from "react";

const useScreenSize = () => {
  const { setHeight, setWidth } = useScreenStore();

  useEffect(() => {
    const updateDimensions = () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [setHeight, setWidth]);
};

export default useScreenSize;