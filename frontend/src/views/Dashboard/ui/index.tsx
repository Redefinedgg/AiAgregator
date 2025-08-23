"use client";

import { useAuthStore } from "@/shared/stores/auth";
import NotAuthorized from "@/widgets/Dashboard/NotAuthorized";
import Button from "@/shared/ui/Button";
import { useLogout } from "@/shared/hooks/useLogout";

export const DashboardView = () => {
  const { user } = useAuthStore();
  const { logout } = useLogout();

  if (!user) return <NotAuthorized />;

  return (
    <div className="w-[100%] flex flex-col items-center mt-[calc(50vh-45vh)]">
      <div className="flex gap-[24px] text-[40px] justify-center items-center mt-[80px]">
        <div>
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-[200px] h-[200px] rounded-[50%]"
          />
        </div>
        <div className="flex flex-col text-[60px]  ">
          <p>Welcome, {user?.username}!</p>
          <p>Your balance is {user?.balance} tokens</p>
        </div>
      </div>
      <div className="mt-[24px]">
        <Button label="Logout" className="w-[200px] h-[60px] text-[32px]" onClick={logout} />
      </div>
    </div>
  );
};

export default DashboardView;
