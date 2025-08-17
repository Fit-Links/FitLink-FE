import React, { Suspense } from "react";

import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyDayOffContainer from "./_components/MyDayOffContainer";
import MyPageContainer from "./_components/MyPageContainer";
import MyPageSkeleton from "./_components/Skeleton";
import MyPTHistorySkeleton from "./_components/Skeleton/MyPTHistorySkeleton";

export default function page() {
  return (
    <HeaderProvider>
      <main className={commonLayoutContents}>
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
    </HeaderProvider>
  );
}
