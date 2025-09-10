import { useChatStore } from "@/shared/stores/chat";
import { useAuthStore } from "../../../stores/auth";

export const useLogout = () => {
  const { setUser } = useAuthStore();
  const { setChats } = useChatStore();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setChats([]);
    window.location.href = "/auth";
  };
  return { logout };
};
