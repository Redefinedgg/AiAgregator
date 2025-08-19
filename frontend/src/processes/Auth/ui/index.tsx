"use client";

import { useAuthStore } from "@/shared/stores/auth";
import { FC } from "react";
import AuthSelectPage from "@/widgets/Auth/AuthSelectPage";
import AuthView from "@/views/Auth/AuthView";

const AuthProcess: FC = () => {
  return (
    <>
      <AuthSelectPage />
      <AuthView />
    </>
  );
};

export default AuthProcess;
