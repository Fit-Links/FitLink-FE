import { Skeleton } from "@ui/components/Skeleton";
import { Text } from "@ui/components/Text";
import React from "react";

import NotificationItemSkeleton from "./NotificationItemSkeleton";

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
