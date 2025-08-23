"use client";

import AuthButtons from "@/widgets/Auth/AuthButtons";
import AuthInputs from "@/widgets/Auth/AuthInputs";
import AuthSelectPage from "@/widgets/Auth/AuthSelectPage";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/stores/auth";
import { useRouter } from "next/navigation";

export const AuthView = () => {
  const { user } = useAuthStore();

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("accessToken") && user !== null && router) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col gap-[24px] justify-center items-center my-[auto]">
      <AuthSelectPage />
      <AuthInputs />
      <AuthButtons />
    </div>
  );
};

export default AuthView;
