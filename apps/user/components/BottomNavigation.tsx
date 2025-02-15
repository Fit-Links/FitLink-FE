"use client";

import { cn } from "@ui/lib/utils";
import { Bell, Calendar, UserRound } from "lucide-react";
import React from "react";

type NavigationItemsProp = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const NAVIGATION_ITEMS: NavigationItemsProp[] = [
  { label: "캘린더", path: "", icon: Calendar },
  { label: "알림", path: "alarm", icon: Bell },
  { label: "마이페이지", path: "my-page", icon: UserRound },
];

export default function BottomNavigation() {
  const handleClickChangePage = () => {
    // TODO: rul 이동 로직 추가
  };

  return (
    <nav className="bg-background-primary border-background-sub2 flex h-[5.063rem] w-full justify-around border-t">
      {NAVIGATION_ITEMS.map(({ label, path, icon: Icon }) => (
        <button
          key={`navigation-${label}`}
          className={cn(
            "text-body-6 text-text-sub4 mt-[0.5rem] flex flex-1 flex-col items-center whitespace-nowrap",
          )}
          onClick={() => handleClickChangePage(path)}
        >
          <Icon />
          <div className={cn("mt-[0.25rem]")}>{label}</div>
        </button>
      ))}
    </nav>
  );
}
