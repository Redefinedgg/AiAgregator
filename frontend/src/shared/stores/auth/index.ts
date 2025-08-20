import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import { RegisterOrLogin } from "@/shared/types/RegisterOrLogin";
import { ProfileSlice, profile } from "./slices/profile";
import { DashboardSlice, dashboard } from "./slices/dashboard";

export interface AuthStore extends ProfileSlice, DashboardSlice {
  registerForm: {
    nickname: string;
    email: string;
    password: string;
  };

  loginForm: {
    nicknameOrEmail: string;
    password: string;
  };

  isRegisterOrLoginPage: RegisterOrLogin;

  setRegisterForm: (form: {
    nickname: string;
    email: string;
    password: string;
  }) => void;
  setLoginForm: (form: { nicknameOrEmail: string; password: string }) => void;

  setIsRegisterOrLoginPage: (page: RegisterOrLogin) => void;
}

export const useAuthStore = createPersistedStore<AuthStore>(
  "authStore",
  (set, get, ...args) => ({
    // State
    registerForm: {
      nickname: "",
      email: "",
      password: "",
    },
    loginForm: {
      nicknameOrEmail: "",
      password: "",
    },
    isRegisterOrLoginPage: "Register",

    // Actions
    setRegisterForm: (form: {
      nickname: string;
      email: string;
      password: string;
    }) => set({ registerForm: form }),
    setLoginForm: (form: { nicknameOrEmail: string; password: string }) =>
      set({ loginForm: form }),

    setIsRegisterOrLoginPage: (page: RegisterOrLogin) =>
      set({ isRegisterOrLoginPage: page }),

    ...profile(set, get, ...args),
    ...dashboard(set, get, ...args),
  })
);
