"use client";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/widgets/Layout/Header"), {
  ssr: false,
  loading: () => (
    <div className="w-[100%] bg-[#11141C] rounded-[12px] h-[100px] max-[768px]:h-[60px]" />
  )
});

export default function ClientHeader() {
  return <Header />;
}