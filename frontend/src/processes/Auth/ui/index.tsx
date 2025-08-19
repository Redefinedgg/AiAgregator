"use client";

import { useAuthStore } from "@/shared/stores/auth";
import { FC } from "react";
import RegisterView from "@/views/Auth/Register";
import LoginView from "@/views/Auth/Login";

const AuthProcess: FC = () => {
  const { isRegisterOrLoginPage } = useAuthStore();

  return isRegisterOrLoginPage === "Register" ? <RegisterView /> : <LoginView />
};

export default AuthProcess;
