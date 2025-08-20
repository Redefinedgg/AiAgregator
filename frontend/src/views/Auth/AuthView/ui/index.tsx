"use client";

import { useAuthStore } from "@/shared/stores/auth";
import Button from "@/shared/ui/Button";
import AuthInputs from "@/widgets/Auth/AuthInputs";
import useHandleAuth from "@/shared/hooks/useHandleAuth";
import ForgottenPassword from "@/widgets/Auth/ForgottenPassword";

export const AuthView = () => {
  const { isRegisterOrLoginPage } = useAuthStore();
  const { handleAuth } = useHandleAuth();

  return (
    <div className="flex flex-col gap-[24px] justify-center items-center mt-[24px]">
      <AuthInputs />
      <Button
        label={isRegisterOrLoginPage}
        className="w-[600px] h-[60px] text-[24px]"
        onClick={handleAuth}
        />
        {isRegisterOrLoginPage === "Login" && <ForgottenPassword />}
    </div>
  );
};

export default AuthView;
