import { useAuthStore } from "../../stores/auth";

export const useLogout = () => {
  const { setUser } = useAuthStore();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/auth";
  };
  return { logout };
};
