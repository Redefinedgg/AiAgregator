"use client";
import ChatProcess from "@/processes/Chat";
import { FC, use } from "react";

interface Props {
  params: Promise<{
    uuid: string;
  }>;
}

const Chat: FC<Props> = ({ params }: Props) => {
  const { uuid } = use(params);
  
  return <ChatProcess uuid={uuid} />;
}

export default Chat;