import React from "react";

import MyPageItemSkeleton from "./MyPageItemSkeleton";
import PTHistoryFilter from "../PTHistory/PTHistoryFilter";
import { PTHistoryLabel } from "../PTHistory/PTHistoryLabel";

export default function MyPageHistorySkeleton() {
  return (
    <div className="mt-[1.625rem]">
      <PTHistoryLabel />
      <PTHistoryFilter />
      <div className="mt-[1.25rem] flex flex-col gap-[0.625rem] overflow-y-auto pb-2">
        <MyPageItemSkeleton className="h-[3.375rem]" />
        <MyPageItemSkeleton className="h-[3.375rem]" />
        <MyPageItemSkeleton className="h-[3.375rem]" />
      </div>
    </div>
  );
}
