"use client";

import { useAuthStore } from "@/shared/stores/auth";
import Button from "@/shared/ui/Button";
import { register, login } from "@/shared/api/auth/requests";
import { useRouter } from "next/navigation";
import AuthInputs from "@/widgets/Auth/AuthInputs";

export const AuthView = () => {
  const { registerForm, loginForm, isRegisterOrLoginPage } = useAuthStore();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isRegisterOrLoginPage === "Register") {
        await register(registerForm);
      } else {
        await login(loginForm);
      }
      router.push("/chat");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-[24px] justify-center items-center mt-[24px]">
      <AuthInputs />
      <Button
        label={isRegisterOrLoginPage}
        className="w-[600px] h-[60px] text-[24px]"
        onClick={handleAuth}
      />
    </div>
  );
};

export default AuthView;
