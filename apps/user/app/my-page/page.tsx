import { Suspense } from "react";

import MyPageContainer from "./_components/MyPageContainer";
import PTHistoryContainer from "./_components/PTHistory/PTHistoryCotainer";
import MyPageSkeleton from "./_components/Skeleton";
import MyPageHistorySkeleton from "./_components/Skeleton/MyPageHistorySkeleton";

export default function page() {
  return (
    <main className="flex h-full w-full flex-col">
      <Suspense fallback={<MyPageSkeleton />}>
        <MyPageContainer />
      </Suspense>

      <Suspense fallback={<MyPageHistorySkeleton />}>
        <PTHistoryContainer />
      </Suspense>
    </main>
  );
}
