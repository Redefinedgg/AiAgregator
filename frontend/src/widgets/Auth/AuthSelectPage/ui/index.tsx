"use client";

import { FC } from "react";
import Button from "@/shared/ui/Button";
import { useAuthStore } from "@/shared/stores/auth";
import { AUTH_OPTIONS } from "@/shared/constants/AUTH_OPTIONS";

export const AuthSelectPage: FC = () => {
  const { isRegisterOrLoginPage, setIsRegisterOrLoginPage } = useAuthStore();

  return (
    <div className="mx-auto flex gap-[24px] justify-center mt-[24px] border-[1px] border-[#ffffff] p-[24px] rounded-[12px] w-[600px]">
      {AUTH_OPTIONS.map((item) => (
        <Button
          key={item}
          label={item}
          className="w-[250px] h-[60px] text-[24px]"
          onClick={() => setIsRegisterOrLoginPage(item)}
          selected={isRegisterOrLoginPage === item}
        />
      ))}
    </div>
  );
};

export default AuthSelectPage;
