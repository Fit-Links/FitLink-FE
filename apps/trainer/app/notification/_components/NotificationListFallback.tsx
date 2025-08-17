import { Skeleton } from "@ui/components/Skeleton";
import { Text } from "@ui/components/Text";
import React from "react";

function NotificationListFallback() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-[0.8125rem] w-[3.125rem]" />
        <Text.Body3>최신순</Text.Body3>
      </div>
      <ul className="flex flex-col items-center gap-4">
        {Array.from({ length: 6 }).map((_v, idx) => (
          <NotificationItemSkeleton key={`noti-skeleton-${idx}`} />
        ))}
      </ul>
    </div>
  );
}

export default NotificationListFallback;

function NotificationItemSkeleton() {
  return (
    <li className="bg-background-sub1 flex h-[6.25rem] w-full items-center gap-4 rounded-[10px] px-[15px]">
      <Skeleton className="h-[3.125rem] w-[3.125rem] rounded-full" />
      <div className="flex flex-col items-start gap-2">
        <Skeleton className="h-[0.9375rem] w-[12.5rem] rounded-full" />
        <Skeleton className="h-[0.9375rem] w-[9.375rem]" />
      </div>
    </li>
  );
}
