import { Suspense } from "react";

import { getKoreanDate } from "@user/utils/date";

import MyPageContainer from "./_components/MyPageContainer";
import PTHistoryContainer from "./_components/PTHistory/PTHistoryCotainer";
import MyPageSkeleton from "./_components/Skeleton";
import MyPageHistorySkeleton from "./_components/Skeleton/MyPageHistorySkeleton";

export default function page() {
  const time = getKoreanDate();

  return (
    <main className="flex h-full w-full flex-col">
      <p suppressHydrationWarning>{time.toString()}</p>
      <p suppressHydrationWarning>{time.toLocaleString()}</p>

      <Suspense fallback={<MyPageSkeleton />}>
        <MyPageContainer />
      </Suspense>
      <Suspense fallback={<MyPageHistorySkeleton />}>
        <PTHistoryContainer />
      </Suspense>
    </main>
  );
}
