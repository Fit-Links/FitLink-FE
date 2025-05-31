import { Skeleton } from "@ui/components/Skeleton";
import { cn } from "@ui/lib/utils";
import React from "react";

interface SkeletonItemProps {
  className?: string;
}

export default function SkeletonItem({ className }: SkeletonItemProps) {
  return (
    <Skeleton
      className={cn(
        "relative flex min-h-[2.813rem] w-full min-w-[22.375rem] items-center",
        className,
      )}
    />
  );
}
