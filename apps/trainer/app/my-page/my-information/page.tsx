import { Suspense } from "react";

import MyInformationContainer from "./_components/MyInformationContainer";
import MyInformationSkeleton from "./_components/Skeleton";

export default async function MyInformation() {
  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center">
      <Suspense fallback={<MyInformationSkeleton />}>
        <MyInformationContainer />
      </Suspense>
    </main>
  );
}
