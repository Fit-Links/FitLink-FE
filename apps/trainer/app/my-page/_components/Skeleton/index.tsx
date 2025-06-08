import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

import MyPageItemSkeleton from "./MyPageItemSkeleton";

export default function MyPageSkeleton() {
  return (
    <section className="flex w-full flex-col">
      <div className="flex h-auto items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="relative flex h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full" />
          <Skeleton className="h-[1.75rem] w-20" />
        </div>

        <Skeleton className="h-[1.6625rem] w-[5.275rem] rounded-2xl" />
      </div>

      <div className="flex flex-col gap-[0.125rem]">
        <MyPageItemSkeleton className="mt-[1.5625rem]" />
        <MyPageItemSkeleton />
      </div>
    </section>
  );
}
