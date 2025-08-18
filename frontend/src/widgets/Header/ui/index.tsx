"use client";
import Link from "next/link";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigateToChats = () => {
    router.push("/chat");
  };

  const navigateToLeaderboard = () => {
    router.push("/leaderboard");
  };

  
  if (!isClient) {
    return (
      <div 
        className="w-[100%] bg-[#11141C] rounded-[12px] h-[100px] max-[768px]:h-[60px]"
        suppressHydrationWarning={true}
      />
    );
  }

  return (
    <header
      className="w-[100%] bg-[#11141C] rounded-[12px] flex justify-between items-center px-4 py-2 h-[100px] max-[768px]:h-[60px]"
      suppressHydrationWarning={true}
    >
      <h1
        className="ml-[30px] font-bold bg-gradient-to-r from-[#8B07FF] to-[#FF00DD] text-center bg-clip-text text-transparent text-[40px] max-[768px]:text-[24px]"
        suppressHydrationWarning={true}
      >
        <Link href="/">Ai Aggregator</Link>
      </h1>
      <div className="flex items-center gap-2 mr-[10px]">
        <Button
          label="Leaderboard"
          className="ml-[30px] flex items-center pl-[18px] pr-[18px] pt-[12px] pb-[15px] justify-center text-[28px] h-[60px] w-[240px] max-[768px]:text-[18px] max-[768px]:h-[40px] max-[768px]:w-[130px]"
          onClick={navigateToLeaderboard}
        />
        <Button
          label="Chats"
          className="ml-[10px] flex items-center pl-[18px] pr-[18px] pt-[12px] pb-[15px] justify-center text-[28px] h-[60px] w-[200px] max-[768px]:text-[18px] max-[768px]:h-[40px] max-[768px]:w-[100px]"
          onClick={navigateToChats}
        />
      </div>
    </header>
  );
};

export default Header;