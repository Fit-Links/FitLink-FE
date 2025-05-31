import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

import SkeletonItem from "@user/app/my-page/my-information/_components/Skeleton/SkeletonItem";

export default function MyTrainerInformationSkeleton() {
  return (
    <section className="flex h-screen w-full flex-col">
      <div className="flex w-full flex-col items-center">
        <Skeleton className="mt-[1.5625rem] flex aspect-square  h-[6.3125rem] w-[6.3125rem] items-center rounded-full" />
      </div>

      <div className="mt-[1.5625rem] flex w-full flex-col gap-1">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </section>
  );
}
