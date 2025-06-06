import { Suspense } from "react";

import MyTrainerInformationContainer from "./_components/MyTrainerInformationContainer";
import MyTrainerInformationSkeleton from "./_components/Skeleton";
import Header from "../_components/Header";

export default function MyTrainerInformation() {
  return (
    <main className="flex h-screen w-full flex-col items-center overflow-hidden pb-[5.063rem]">
      <Header title="트레이너" />

      <Suspense fallback={<MyTrainerInformationSkeleton />}>
        <MyTrainerInformationContainer />
      </Suspense>
    </main>
  );
}
