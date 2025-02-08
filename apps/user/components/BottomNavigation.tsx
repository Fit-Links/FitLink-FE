"use client";

import { cn } from "@ui/lib/utils";
import { Bell, Calendar, UserRound } from "lucide-react";
import React, { useState } from "react";

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
  const [page, setPage] = useState("");

  const handleClickChangePage = (path: string) => {
    setPage(path);
  };

  return (
    <nav className="bg-background-primary border-background-sub2 flex h-[5.063rem] w-full justify-around border-t">
      {NAVIGATION_ITEMS.map(({ label, path, icon: Icon }) => (
        <button
          key={`navigation-${label}`}
          className={cn(
            "text-body-6 text-text-sub4 mt-[0.5rem] flex flex-1 flex-col items-center whitespace-nowrap",
            page === path && "text-text-primary text-body-5",
          )}
          onClick={() => handleClickChangePage(path)}
        >
          <Icon />
          <div
            className={cn("mt-[0.25rem]", page === path && "text-text-primary text-text-body-5")}
          >
            {label}
          </div>
        </button>
      ))}
    </nav>
  );
}
