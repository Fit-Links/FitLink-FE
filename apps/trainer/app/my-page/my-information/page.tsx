import { Suspense } from "react";

import QueryErrorFallback from "@trainer/components/QueryErrorFallback";

import MyInformationContainer from "./_components/MyInformationContainer";
import MyInformationSkeleton from "./_components/Skeleton";

export default async function MyInformation() {
  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center">
      <QueryErrorFallback>
        <Suspense fallback={<MyInformationSkeleton />}>
          <MyInformationContainer />
        </Suspense>
      </QueryErrorFallback>
    </main>
  );
}
