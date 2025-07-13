"use client";

import { cn } from "@ui/lib/utils";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import RouteInstance from "@trainer/constants/route";

import BottomNavigation from "../BottomNavigation";

const PATHS = {
  WITH_FOOTER: new Set([
    RouteInstance["schedule-management"](),
    RouteInstance["member-management"](),
    RouteInstance.notification(),
    RouteInstance["my-page"](),
  ]),
};

const doesPathNeedFooter = (pathName: string) => PATHS.WITH_FOOTER.has(pathName);

function FooterProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const hasFooter = doesPathNeedFooter(pathName);

  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <>
      <div
        className={cn(
          "bg-background-primary text-text-primary md:border-background-sub2 md:max-w-mobile relative mx-0 box-content flex min-h-[calc(100%-5.063rem)] flex-col md:mx-auto md:border md:shadow-lg",
          {
            "min-h-[calc(100%-5.063rem)] pb-[5.063rem]": hasFooter,
            "min-h-[calc(100%-2.125rem)] pb-[2.125rem]": !hasFooter,
          },
        )}
      >
        {!isNavigating && <div className="h-full w-full px-4">{children}</div>}
        {hasFooter && (
          <BottomNavigation isNavigating={isNavigating} setIsNavigating={setIsNavigating} />
        )}
      </div>
    </>
  );
}

export default FooterProvider;
