import React from "react";

import MyPageItemSkeleton from "./MyPageItemSkeleton";

function MyPTHistorySkeleton() {
  return (
    <div className="mt-[1.563rem] flex h-auto w-full flex-col gap-0.5">
      <p className="text-headline">PT 수업 시간</p>
      <MyPageItemSkeleton className="mt-[0.625rem] h-[5.4375rem]" />
    </div>
  );
}

export default MyPTHistorySkeleton;
