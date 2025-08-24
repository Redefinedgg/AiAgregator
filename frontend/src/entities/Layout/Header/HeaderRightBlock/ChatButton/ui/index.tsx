"use client";

import Link from "next/link";
import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

export const ChatButton = () => {
  const router = useRouter();

  return (
    <Link href="/chat">
      <Button
        label="New chat"
        className="ml-[30px] mr-[10px] flex items-center pl-[18px] pr-[18px] pt-[12px] pb-[15px] justify-center text-[40px] h-[60px] w-[250px] max-[768px]:text-[24px] max-[768px]:h-[40px] max-[768px]:w-[100px]"
        onClick={() => router.push("/chat")}
      />
    </Link>
  );
};

export default ChatButton;
