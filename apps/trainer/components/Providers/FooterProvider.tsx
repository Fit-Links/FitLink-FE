"use client";

import { cn } from "@ui/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

import BottomNavigation from "../BottomNavigation";

// TODO[2025.04.14]: trainer 모든 경로 분류하기
const PATHS = {
  WITH_FOOTER: new Set(["/", "/schedule-management"]),
  WITHOUT_FOOTER: new Set(["/register", "/login"]),
};

const doesPathNeedFooter = (pathName: string) => PATHS.WITH_FOOTER.has(pathName);

function FooterProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const hasFooter = doesPathNeedFooter(pathName);

  return (
    <>
      <div
        className={cn("h-full px-4", {
          "pb-[5.063rem]": hasFooter,
          "pb-[2.125rem]": !hasFooter,
        })}
      >
        {children}
      </div>
      {hasFooter && <BottomNavigation />}
    </>
  );
}

export default FooterProvider;
