"use client";

import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-[calc(100vh-220px)] items-center justify-center">
      <Button
        className="items-center justify-center flex px-[18px] py-[12px] 
                   max-[768px]:w-[250px] max-[768px]:h-[60px] max-[768px]:text-[24px] 
                   w-[500px] h-[80px] text-[30px]"
        label="Create new chat"
        onClick={() => router.push("/chat")}
      />
    </div>
  );
}
