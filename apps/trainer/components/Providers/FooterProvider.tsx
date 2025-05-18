"use client";

import { cn } from "@ui/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

import RouteInstance from "@trainer/constants/route";

import BottomNavigation from "../BottomNavigation";

const PATHS = {
  WITH_FOOTER: new Set([
    RouteInstance["schedule-management"](),
    RouteInstance["member-management"](),
    RouteInstance.notification(),
    RouteInstance["my-page"](),
  ]),
  WITHOUT_FOOTER: new Set([
    RouteInstance.register(),
    RouteInstance["sns-verification"](),
    RouteInstance.login(),
  ]),
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
