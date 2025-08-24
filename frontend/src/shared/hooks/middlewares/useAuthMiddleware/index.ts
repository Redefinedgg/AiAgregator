import { useAuthStore } from "@/shared/stores/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useAuthMiddleware = () => {
  const { isAuth, user, _hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Проверяем аутентификацию только после завершения гидратации из localStorage
    if (_hasHydrated && (!isAuth || !user)) {
      router.push("/auth");
      toast.error("You are not authenticated, so you are redirected to the login page");
    }
  }, [router, isAuth, user, _hasHydrated]);

  // Возвращаем состояние загрузки для опционального использования в компонентах
  return { 
    isLoading: !_hasHydrated,
    isAuthenticated: _hasHydrated && isAuth && !!user 
  };
};