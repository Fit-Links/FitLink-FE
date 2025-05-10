import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import MyTrainerInformationContainer from "./_components/MyTrainerInformationContainer";

export default async function MyTrainerInformation() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myInformationQueries.detail());

  return (
    <main className="flex h-screen w-full flex-col items-center overflow-hidden pb-[5.063rem]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyTrainerInformationContainer />
      </HydrationBoundary>
    </main>
  );
}
