"use client";

import { useAuthStore } from "@/shared/stores/auth";
import NotAuthorized from "@/widgets/Dashboard/NotAuthorized";

export const DashboardView = () => {
  const { user } = useAuthStore();

  if (!user) return <NotAuthorized />;

  return (
    <div className="flex flex-col gap-[24px] text-[40px] justify-center items-center mt-[80px]">
      Welcome, {user?.nickname}!
      <br />
      Your balance is {user?.balance} tokens
    </div>
  );
};

export default DashboardView;
