import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

function Fallback() {
  return (
    <section className="flex h-screen w-full flex-col items-center">
      <section className="mt-[1.25rem] flex w-full flex-col gap-0.5">
        <Skeleton className="relative flex min-h-[2.813rem] w-full min-w-[22.375rem] items-center" />
        <Skeleton className="relative flex min-h-[2.813rem] w-full min-w-[22.375rem] items-center" />
        <Skeleton className="relative flex min-h-[2.813rem] w-full min-w-[22.375rem] items-center" />
      </section>
    </section>
  );
}

export default Fallback;
