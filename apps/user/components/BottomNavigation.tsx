"use client";

import { cn } from "@ui/lib/utils";
import { Calendar, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import RouteInstance from "@user/constants/routes";

import { NotificationBell } from "./NotificationBell";

type BottomNavigationProps = {
  isNavigating: boolean;
  setIsNavigating: (isNavigating: boolean) => void;
};

const navigationItems = Object.freeze([
  { label: "캘린더", path: RouteInstance["schedule-management"](), icon: Calendar },
  { label: "알림", path: RouteInstance.notification(), icon: NotificationBell },
  { label: "마이페이지", path: RouteInstance["my-page"](), icon: UserRound },
]);

export default function BottomNavigation({ isNavigating, setIsNavigating }: BottomNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState(pathname);

  useEffect(() => {
    setActiveTab(pathname);
    setIsNavigating(false);
  }, [pathname]);

  const handleNavigation = (path: string) => {
    if (path === pathname) return;

    setActiveTab(path);
    setIsNavigating(true);
    router.push(path);
  };

  return (
    <nav className="bg-background-primary border-background-sub2 md:max-w-mobile fixed bottom-0 z-10 flex h-[5.063rem] w-full justify-around border-t">
      {navigationItems.map(({ icon: Icon, label, path }, index) => (
        <div key={`${label}-${index}`} className="flex flex-1 items-center justify-center">
          <button
            onClick={() => handleNavigation(path)}
            disabled={isNavigating}
            className={cn(
              "text-background-sub4 md:hover:text-background-sub5 flex w-12 flex-col items-center justify-center gap-1 transition-colors",
              {
                "text-text-primary": activeTab === path,
                "opacity-50": isNavigating && activeTab !== path,
              },
            )}
          >
            <Icon />
            <span className="text-body-5">{label}</span>
          </button>
        </div>
      ))}
    </nav>
  );
}
