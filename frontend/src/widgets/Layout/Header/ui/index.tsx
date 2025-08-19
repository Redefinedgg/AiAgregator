"use client";
import Link from "next/link";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "@/shared/stores/auth";

const Header = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isAuth } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
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
      <Link href={isAuth ? "/dashboard" : "/auth"}>
        <div className="flex items-center gap-[10px]">
          <Button
            label="Chats"
            className="ml-[30px] mr-[10px] flex items-center pl-[18px] pr-[18px] pt-[12px] pb-[15px] justify-center text-[40px] h-[60px] w-[250px] max-[768px]:text-[24px] max-[768px]:h-[40px] max-[768px]:w-[100px]"
            onClick={() => router.push("/chat")}
          />
          <Button label={<FaUser size={50} />} />
        </div>
      </Link>
    </header>
  );
};

export default Header;
