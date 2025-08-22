"use client";

import { useEffect, useState } from "react";
import IsNotClient from "./IsNotClient";
import HeaderLeftBlock from "@/features/Layout/Header/HeaderLeftBlock";
import HeaderRightBlock from "@/features/Layout/Header/HeaderRightBlock";
import { useAuthStore } from "@/shared/stores/auth";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuthStore();

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
      {user && (
        <p className="text-[40px] max-[1000px]:text-[24px] max-[768px]:text-[20px]">
          Your balance: {user?.balance.toFixed(6)}
        </p>
      )}
      <HeaderRightBlock />
    </header>
  );
};

export default Header;
