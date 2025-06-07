import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

import ProfileCardFallback from "./ProfileCardFallback";

function MemberContainerFallback() {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-20">
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="flex flex-grow flex-col gap-2">
        <ProfileCardFallback />
        <ProfileCardFallback />
        <ProfileCardFallback />
        <ProfileCardFallback />
      </div>

      <Skeleton className="mb-2 mt-2 h-12 w-full rounded-md" />
    </div>
  );
}

export default MemberContainerFallback;
