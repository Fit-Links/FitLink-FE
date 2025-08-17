import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

import Header from "@trainer/app/my-page/_components/Header";
import MyPageItemSkeleton from "@trainer/app/my-page/_components/Skeleton/MyPageItemSkeleton";

export default function MyInformationSkeleton() {
  return (
    <section className="flex h-screen w-full flex-col">
      <Header title="내 정보" />
      <div className="flex w-full flex-col items-center">
        <Skeleton className="mt-[1.5625rem] flex aspect-square  h-[6.3125rem] w-[6.3125rem] items-center rounded-full" />
        <Skeleton className="mt-[1.25rem] h-[1.9375rem] w-[8.1875rem] rounded-2xl" />
      </div>

      <div className="mt-[1.5625rem] flex w-full flex-col gap-1">
        <MyPageItemSkeleton />
        <MyPageItemSkeleton />
        <MyPageItemSkeleton />
      </div>
    </section>
  );
}
