"use client";

import Link from "next/link";
import Button from "@/shared/ui/Button";
import { useAuthStore } from "@/shared/stores/auth";

export const NotAuthorized = () => {
  const { setIsRegisterOrLoginPage } = useAuthStore();

  return (
    <div className="flex flex-col gap-[24px] text-center text-[40px] justify-center items-center mt-[80px]">
      You are not authorized. <br />
      Please log in.
      <Link href="/auth">
        <Button onClick={() => setIsRegisterOrLoginPage("Login")} className="w-[200px] h-[60px] text-[32px]" label="Log in" />
      </Link>
    </div>
  );
};

export default NotAuthorized;
