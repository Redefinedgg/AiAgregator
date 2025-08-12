"use client";

import Link from "next/link";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import { useScreenStore } from "@/shared/stores/screen";

const Header = () => {
  const router = useRouter();
  const { width } = useScreenStore();

  const navigateToChats = () => {
    router.push("/chat");
  };

  return (
    <header className={`w-[100%] bg-[#11141C] rounded-[12px] flex justify-between items-center px-4 py-2 ${width < 768 ? "h-[60px]" : "h-[100px]"}`}>
      <h1
        className={`ml-[30px] font-bold bg-gradient-to-r from-[#8B07FF] to-[#FF00DD] text-center bg-clip-text text-transparent ${
          width < 768 ? "text-[24px]" : "text-[40px]"
        }`}
      >
        <Link href="/">Ai Aggregator</Link>
      </h1>
      <Button
        label="Chats"
        className={`ml-[30px] mr-[10px] flex items-center pl-[18px] pr-[18px] pt-[12px] pb-[15px] justify-center ${width < 768 ? "text-[24px] h-[40px] w-[100px]" : "text-[40px] h-[60px] w-[250px]"}`}
        onClick={navigateToChats}
      />
    </header>
  );
};

export default Header;
