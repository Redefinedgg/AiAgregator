import { getChats } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat";
import { useEffect } from "react";

export const useFetchChatsData = () => {
  const { setChats } = useChatStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!window.localStorage.getItem("accessToken")) return;
        const data = await getChats();
        setChats(data.chats);
      } catch (err) {
        console.error("failed to get user's data");
      }
    }

    fetchData();
  }, [])
}
