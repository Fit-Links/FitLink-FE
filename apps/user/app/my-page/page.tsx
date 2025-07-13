import { Suspense } from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import MyPageContainer from "./_components/MyPageContainer";
import PTHistoryContainer from "./_components/PTHistory/PTHistoryCotainer";
import MyPageSkeleton from "./_components/Skeleton";
import MyPageHistorySkeleton from "./_components/Skeleton/MyPageHistorySkeleton";

export default function page() {
  return (
    <HeaderProvider>
      <main className={commonLayoutContents}>
        <Suspense fallback={<MyPageSkeleton />}>
          <MyPageContainer />
        </Suspense>

        <Suspense fallback={<MyPageHistorySkeleton />}>
          <PTHistoryContainer />
        </Suspense>
      </main>
    </HeaderProvider>
  );
}
