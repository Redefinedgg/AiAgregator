"use client";

import { useAuthStore } from "@/shared/stores/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetMe } from "@/shared/hooks/auth/useGetMe";

export const SuccessView = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const {me} = useGetMe();

  useEffect(() => {
    if (token ) {
        localStorage.setItem("accessToken", token);
        const login = async () => {
            await me();
            window.location.href = "/dashboard";
        }
        login();
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-[24px] justify-center items-center my-[auto]">
      <h1 className="text-[40px]">You have been successfully logged in. Please wait...</h1>
    </div>
  );
};

export default SuccessView;
