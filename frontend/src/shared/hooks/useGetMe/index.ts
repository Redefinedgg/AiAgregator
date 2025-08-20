import { me as meApi } from "@/shared/api/users/requests";
import { useAuthStore } from "@/shared/stores/auth";
import router from "next/router";

export const useGetMe = () => {
  const { logout, setIsRegisterOrLoginPage } = useAuthStore();
  const me = async () => {
    try {
      const response = await meApi();

      return response.data;
    } catch (error: any) {
      if (error.status === 401) {
        logout();
        setIsRegisterOrLoginPage("Login");
        router.push("/auth");
      }
      throw error;
    }
  };

  return { me };
};
