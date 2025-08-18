import { createPersistedStore } from "@/shared/hooks/createPersistedStore";
import { get } from "http";

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
