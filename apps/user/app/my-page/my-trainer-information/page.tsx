import { HydrationBoundary } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import { getQueryClient } from "@user/components/Providers/queryClient";

import MyTrainerInformationContainer from "./_components/MyTrainerInformationContainer";

export default async function MyTrainerInformation() {
  const queryClient = getQueryClient();

  const data = await queryClient.prefetchQuery(myInformationQueries.detail());

  return (
    <main className="flex h-screen w-full flex-col items-center overflow-hidden pb-[5.063rem]">
      <HydrationBoundary state={data}>
        <MyTrainerInformationContainer />
      </HydrationBoundary>
    </main>
  );
}
