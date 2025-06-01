import { Skeleton } from "@ui/components/Skeleton";
import { cn } from "@ui/lib/utils";
import React from "react";

type MyPageItemSkeletonProps = {
  className?: string;
};

function MyPageItemSkeleton({ className }: MyPageItemSkeletonProps) {
  return <Skeleton className={cn("flex h-[2.8125rem] w-full rounded-md", className)} />;
}

export default MyPageItemSkeleton;
