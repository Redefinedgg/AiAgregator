import { getChats } from "@/shared/api/chats/requests";
import { useChatStore } from "@/shared/stores/chat";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useFetchData = () => {
  const { setChats } = useChatStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChats();
        setChats(data.chats);
      } catch (err) {
        console.error("failed to get user's data");
        toast.error("failed to get user's data");
      }
    }

    fetchData();
  }, [])
}
