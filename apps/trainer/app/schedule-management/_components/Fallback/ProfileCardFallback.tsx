import { Skeleton } from "@ui/components/Skeleton";
import React from "react";

function ProfileCardFallback() {
  return (
    <div className="bg-background-sub1 flex h-[5.625rem] items-center gap-[10px] rounded-[0.625rem] px-[20px]">
      <Skeleton className="h-[3.125rem] w-[3.125rem] rounded-full " />
      <div className="flex h-[40px] flex-col justify-between">
        <Skeleton className="h-[17px] w-[50px]" />
        <Skeleton className="h-[13px] w-[100px]" />
      </div>
    </div>
  );
}

export default ProfileCardFallback;
