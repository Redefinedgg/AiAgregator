import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import { RegisterOrLogin } from "@/shared/types/RegisterOrLogin";

export interface AuthStore {
  registerForm: {
    nickname: string;
    email: string;
    password: string;
  };

  loginForm: {
    nickname: string;
    email: string;
    password: string;
  };

  isRegisterOrLoginPage: RegisterOrLogin;

  setRegisterForm: (form: {
    nickname: string;
    email: string;
    password: string;
  }) => void;
  setLoginForm: (form: {
    nickname: string;
    email: string;
    password: string;
  }) => void;

  setIsRegisterOrLoginPage: (page: RegisterOrLogin) => void;
  setLoginPage: () => void;
  setRegisterPage: () => void;

  changeRegisterNickname: (nickname: string) => void;
  changeRegisterEmail: (email: string) => void;
  changeRegisterPassword: (password: string) => void;

  changeLoginFormNickname: (nickname: string) => void;
  changeLoginFormEmail: (email: string) => void;
  changeLoginFormPassword: (password: string) => void;
}

export const useAuthStore = createPersistedStore<AuthStore>(
  "authStore",
  (set, get) => ({
    // State
    registerForm: {
      nickname: "",
      email: "",
      password: "",
    },
    loginForm: {
      nickname: "",
      email: "",
      password: "",
    },
    isRegisterOrLoginPage: "Register",

    // Actions
    setRegisterForm: (form: {
      nickname: string;
      email: string;
      password: string;
    }) => set({ registerForm: form }),
    setLoginForm: (form: {
      nickname: string;
      email: string;
      password: string;
    }) => set({ loginForm: form }),

    setIsRegisterOrLoginPage: (page: RegisterOrLogin) =>
      set({ isRegisterOrLoginPage: page }),

    setLoginPage: () => set({ isRegisterOrLoginPage: "Login" }),
    setRegisterPage: () => set({ isRegisterOrLoginPage: "Register" }),

    changeRegisterNickname: (nickname: string) =>
      set({ registerForm: { ...get().registerForm, nickname } }),
    changeRegisterEmail: (email: string) =>
      set({ registerForm: { ...get().registerForm, email } }),
    changeRegisterPassword: (password: string) =>
      set({ registerForm: { ...get().registerForm, password } }),

    changeLoginFormNickname: (nickname: string) =>
      set({ loginForm: { ...get().loginForm, nickname } }),
    changeLoginFormEmail: (email: string) =>
      set({ loginForm: { ...get().loginForm, email } }),
    changeLoginFormPassword: (password: string) =>
      set({ loginForm: { ...get().loginForm, password } }),
  })
);
