"use client";

import { cn } from "@ui/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

import BottomNavigation from "../BottomNavigation";

const PATHS = {
  WITH_FOOTER: new Set([
    RouteInstance["schedule-management"](),
    RouteInstance.notification(),
    RouteInstance["my-page"](),
  ]),
};

const doesPathNeedFooter = (pathName: string) => PATHS.WITH_FOOTER.has(pathName);

function FooterProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const hasFooter = doesPathNeedFooter(pathName);

  return (
    <>
      <div
        className={cn("flex h-full flex-col px-4 pt-3", {
          "pb-[5.625rem]": hasFooter,
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
