import BrandSpinner from "@ui/components/BrandSpinner";
import React, { Suspense } from "react";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import EditPreferenceTimeContainer from "./_components/EditPreferenceTimeContainer";

export default async function EditWorkoutSchedules() {
  return (
    <HeaderProvider title="PT 희망 시간" back>
      <main className={commonLayoutContents}>
        <Suspense fallback={<BrandSpinner />}>
          <EditPreferenceTimeContainer />
        </Suspense>
      </main>
    </HeaderProvider>
  );
}
