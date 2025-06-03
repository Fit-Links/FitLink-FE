import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyDayOffContainer from "./_components/MyDayOffContainer";
import MyPageContainer from "./_components/MyPageContainer";
import MyPageSkeleton from "./_components/Skeleton";

export default function page() {
  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      <QueryErrorResetBoundary>
        <Suspense fallback={<MyPageSkeleton />}>
          <MyPageContainer />
          <MyAvailableTimeContainer />
          <MyDayOffContainer />
        </Suspense>
      </QueryErrorResetBoundary>
    </main>
  );
}
