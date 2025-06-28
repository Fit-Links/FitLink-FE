import React, { Suspense } from "react";

import { getKoreanDate } from "@trainer/utils/date";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyDayOffContainer from "./_components/MyDayOffContainer";
import MyPageContainer from "./_components/MyPageContainer";
import MyPageSkeleton from "./_components/Skeleton";
import MyPTHistorySkeleton from "./_components/Skeleton/MyPTHistorySkeleton";

export default function page() {
  const time = getKoreanDate();

  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      <p suppressHydrationWarning>{time.toString()}</p>
      <p suppressHydrationWarning>{time.toLocaleString()}</p>

      <Suspense fallback={<MyPageSkeleton />}>
        <MyPageContainer />
      </Suspense>
      <Suspense fallback={<MyPTHistorySkeleton />}>
        <MyAvailableTimeContainer />
      </Suspense>
      <Suspense fallback={<></>}>
        <MyDayOffContainer />
      </Suspense>
    </main>
  );
}
