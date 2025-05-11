"use client";

import { Suspense } from "@suspensive/react";

import Fallback from "./_components/Fallback";
import Header from "../_components/Header";
import MyDetailInformations from "./_components/MyDetailInformations";
import MyInformationAvatar from "./_components/MyInformationAvatar";

export default function MyInformation() {
  return (
    <main className="flex h-screen w-full flex-col items-center ">
      <Header title="내 정보" />

      {/* <ErrorBoundary fallback={<NetworkFallback />}> */}
      <MyInformationAvatar />

      <Suspense fallback={<Fallback />}>
        <MyDetailInformations />
      </Suspense>
      {/* </ErrorBoundary> */}
    </main>
  );
}
