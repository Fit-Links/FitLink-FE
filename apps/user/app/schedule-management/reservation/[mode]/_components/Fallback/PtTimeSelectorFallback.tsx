import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

function PtTimeSelectorFallback() {
  return (
    <section className="flex h-full flex-col">
      <div className="flex-grow">
        <Skeleton className={"bg-background-sub5/10 mb-2 mt-10 h-8 w-20 rounded-md"} />
        <Skeleton className={"bg-background-sub5/10 mb-2 mt-2 h-36 w-full rounded-md"} />
        <Skeleton className={"bg-background-sub5/10 mb-2 mt-2 h-8 w-20 rounded-md"} />
        <Skeleton className={"bg-background-sub5/10 mb-2 mt-2 h-36 w-full rounded-md"} />
      </div>
      <Skeleton className={"bg-background-sub5/10 mb-2 mt-2 h-12 w-full rounded-md"} />
    </section>
  );
}

export default PtTimeSelectorFallback;
