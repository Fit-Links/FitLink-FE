import { Suspense } from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import MyDetailInformations from "./_components/MyDetailInformations";
import MyInformationAvatar from "./_components/MyInformationAvatar";
import MyInformationSkeleton from "./_components/Skeleton";

export default function MyInformation() {
  return (
    <HeaderProvider title="내 정보" back>
      <main className={commonLayoutContents}>
        <Suspense fallback={<MyInformationSkeleton />}>
          <div className="flex flex-col items-center">
            <MyInformationAvatar />
            <MyDetailInformations />
          </div>
        </Suspense>
      </main>
    </HeaderProvider>
  );
}
