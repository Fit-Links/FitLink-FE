"use client";

import { cn } from "@ui/lib/utils";
import { Bell, Calendar, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import RouteInstance from "@user/constants/routes";

export default function BottomNavigation() {
  const navigationItems = Object.freeze([
    { label: "캘린더", path: RouteInstance["schedule-management"](), icon: Calendar },
    { label: "알림", path: RouteInstance.notification(), icon: Bell },
    { label: "마이페이지", path: RouteInstance["my-page"](), icon: UserRound },
  ]);

  const pathname = usePathname();

  return (
    <nav className="bg-background-primary border-background-sub2 md:max-w-mobile fixed bottom-0 z-10 flex h-[5.063rem] w-full justify-around border-t">
      {navigationItems.map(({ icon: Icon, label, path }, index) => (
        <div key={`${label}-${index}`} className="flex flex-1 items-center justify-center">
          <Link
            href={path}
            className={cn(
              "text-background-sub4 md:hover:text-background-sub5 flex w-12 flex-col items-center justify-center gap-1 transition-colors",
              {
                "text-text-primary": pathname === path,
              },
            )}
          >
            <Icon />
            <span className="text-body-5">{label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}
