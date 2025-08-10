"use client";

import Button from "@/shared/ui/Button";
import { useRouter } from "next/navigation";
import { useScreenStore } from "@/shared/stores/screen";

export default function HomeView() {
  const router = useRouter();
  const { width } = useScreenStore();
  return (
    <div className="flex flex-col items-center mt-[calc(50vh-200px)]">
      <Button
        className={`items-center justify-center flex items-center pl-[18px] pr-[18px] py-[12px] ${width < 768 ? "w-[250px] h-[60px] text-[24px]" : "w-[500px] h-[80px] text-[30px]"}`}
        label="Create new chat"
        onClick={() => router.push("/chat")}
      />
    </div>
  );
}
