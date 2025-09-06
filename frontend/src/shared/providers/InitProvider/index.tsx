"use client";

import { useFetchData } from "@/shared/hooks/providers/useFetchData";

type Props = {
  children: React.ReactNode;
}

export default function InitProvider({ children }: Props) {
  useFetchData();

  return <>{children}</>;
}
