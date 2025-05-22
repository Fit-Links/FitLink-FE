"use client";

import Header from "../_components/Header";
import MyDetailInformations from "./_components/MyDetailInformations";
import MyInformationAvatar from "./_components/MyInformationAvatar";

export default function MyInformation() {
  return (
    <main className="flex h-screen w-full flex-col items-center ">
      <Header title="내 정보" />

      {/* <ErrorBoundary fallback={<NetworkFallback />}> */}
      <MyInformationAvatar />

      <MyDetailInformations />

      {/* </ErrorBoundary> */}
    </main>
  );
}
