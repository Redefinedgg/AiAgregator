"use client";

import { useEffect, useState } from "react";
import IsNotClient from "./IsNotClient";
import HeaderLeftBlock from "@/features/Layout/Header/HeaderLeftBlock";
import HeaderRightBlock from "@/features/Layout/Header/HeaderRightBlock";

const Header = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <IsNotClient />;

  return (
    <header
      className="w-[100%] bg-[#11141C] rounded-[12px] flex justify-between items-center px-4 py-2 h-[100px] max-[768px]:h-[60px]"
      suppressHydrationWarning={true}
    >
      <HeaderLeftBlock />
      <HeaderRightBlock />
    </header>
  );
};

export default Header;
