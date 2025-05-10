import { Suspense } from "@suspensive/react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import Fallback from "./_components/Fallback";
import Header from "../_components/Header";
import MyDetailInformations from "./_components/MyDetailInformations";
import MyInformationAvatar from "./_components/MyInformationAvatar";

export default async function MyInformation() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myInformationQueries.detail());

  return (
    <main className="flex h-screen w-full flex-col items-center ">
      <Header title="내 정보" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <ErrorBoundary fallback={<NetworkFallback />}> */}
        <MyInformationAvatar />

        <Suspense fallback={<Fallback />}>
          <MyDetailInformations />
        </Suspense>
        {/* </ErrorBoundary> */}
      </HydrationBoundary>
    </main>
  );
}
