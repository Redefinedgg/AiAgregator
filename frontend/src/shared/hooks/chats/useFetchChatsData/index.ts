import { getChats } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/stores/auth";
import { useRouter } from "next/navigation";

export const useFetchChatsData = () => {
  const { setChats } = useChatStore();
  const router = useRouter();
  const { setIsAuth, logout } = useAuthStore();
  useEffect(() => {
    const fetchData = async () => {
      if (!window.localStorage.getItem("accessToken")) {
        router.push("/auth");
        setIsAuth(false);
        logout();
        return;
      }
      const data = await getChats();
      if (data && "statusCode" in data && data.statusCode === 401) {
        setIsAuth(false);
        logout();
        router.push("/auth");
        return; 
      }

      if (data && "chats" in data) {
        setChats(data.chats!);
      }
    };

    fetchData();
  }, []);
};
