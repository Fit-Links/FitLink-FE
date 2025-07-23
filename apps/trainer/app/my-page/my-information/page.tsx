import { cn } from "@ui//lib/utils";
import { Suspense } from "react";

import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import MyInformationContainer from "./_components/MyInformationContainer";
import MyInformationSkeleton from "./_components/Skeleton";

export default async function MyInformation() {
  return (
    <HeaderProvider title="내 정보" back>
      <main className={cn(commonLayoutContents, "px-4")}>
        <Suspense fallback={<MyInformationSkeleton />}>
          <MyInformationContainer />
        </Suspense>
      </main>
    </HeaderProvider>
  );
}
