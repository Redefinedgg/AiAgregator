"use client";

import AuthButtons from "@/widgets/Auth/AuthButtons";
import AuthInputs from "@/widgets/Auth/AuthInputs";
import AuthSelectPage from "@/widgets/Auth/AuthSelectPage";

export const AuthView = () => {
  return (
    <div className="flex flex-col gap-[24px] justify-center items-center my-[auto]">
      <AuthSelectPage />
      <AuthInputs />
      <AuthButtons />
    </div>
  );
};

export default AuthView;
