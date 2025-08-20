"use client";

import AuthButtons from "@/widgets/Auth/AuthButtons";
import AuthInputs from "@/widgets/Auth/AuthInputs";

export const AuthView = () => {

  return (
    <div className="flex flex-col gap-[24px] justify-center items-center mt-[24px]">
      <AuthInputs />
      <AuthButtons />
    </div>
  );
};

export default AuthView;
