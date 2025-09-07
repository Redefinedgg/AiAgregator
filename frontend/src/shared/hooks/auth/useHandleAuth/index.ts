import { useAuthStore } from "@/shared/stores/auth";
import { useRouter } from "next/navigation";
import { register, login } from "@/shared/api/auth/requests";

export const useHandleAuth = () => {
  const { registerForm, loginForm, isRegisterOrLoginPage, setUser, setIsAuth } =
    useAuthStore();
  const router = useRouter();

  const handleAuth = async () => {
    try {
      const response =
        isRegisterOrLoginPage === "Register"
          ? await register(registerForm)
          : await login(loginForm);
      if (response.user?.avatar === null) response.user.avatar = "/avatar/withoutAvatar.jpg";
      setUser(response.user);
      setIsAuth(true);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleAuth,
  };
};

export default useHandleAuth;
