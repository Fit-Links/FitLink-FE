import { Suspense } from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import MyTrainerInformationContainer from "./_components/MyTrainerInformationContainer";
import MyTrainerInformationSkeleton from "./_components/Skeleton";

export default function MyTrainerInformation() {
  return (
    <HeaderProvider title="트레이너" back>
      <main className={commonLayoutContents}>
        <Suspense fallback={<MyTrainerInformationSkeleton />}>
          <MyTrainerInformationContainer />
        </Suspense>
      </main>
    </HeaderProvider>
  );
}
