import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import { getQueryClient } from "@user/components/Providers/getQueryClient";

import MyTrainerInformationContainer from "./_components/MyTrainerInformationContainer";

export default async function MyTrainerInformation() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(myInformationQueries.detail());

  return (
    <main className="flex h-screen w-full flex-col items-center overflow-hidden pb-[5.063rem]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyTrainerInformationContainer />
      </HydrationBoundary>
    </main>
  );
}
