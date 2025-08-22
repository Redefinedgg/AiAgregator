"use client";
import ChatButton from "@/entities/Layout/Header/HeaderRightBlock/ChatButton";
import ProfileButton from "@/entities/Layout/Header/HeaderRightBlock/ProfileButton";

export const HeaderRightBlock = () => {
  return (
    <div className="flex items-center ml-[-30px] gap-[10px]">
      <ChatButton />
      <ProfileButton />
    </div>
  );
};

export default HeaderRightBlock;
