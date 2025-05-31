import { Suspense } from "react";

import QueryErrorFallback from "@user/components/QueryErrorFallback";

import Header from "../_components/Header";
import MyDetailInformations from "./_components/MyDetailInformations";
import MyInformationAvatar from "./_components/MyInformationAvatar";
import MyInformationSkeleton from "./_components/Skeleton";

export default function MyInformation() {
  return (
    <main className="flex h-screen w-full flex-col items-center ">
      <Header title="내 정보" />
      <QueryErrorFallback>
        <Suspense fallback={<MyInformationSkeleton />}>
          <MyInformationAvatar />
          <MyDetailInformations />
        </Suspense>
      </QueryErrorFallback>
    </main>
  );
}
