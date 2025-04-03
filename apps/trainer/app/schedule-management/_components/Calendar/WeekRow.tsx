"use client";

import { ReactNode } from "react";

type WeekRowProps = {
  children?: ReactNode;
};

export default function WeekRow({ children }: WeekRowProps) {
  return <div className="flex h-full gap-[0.125rem]">{children}</div>;
}
