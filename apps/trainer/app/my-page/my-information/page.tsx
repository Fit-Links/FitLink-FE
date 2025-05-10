import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@trainer/queries/myInformation";

import MyInformationContainer from "./_components/MyInformationContainer";

export default async function MyInformation() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myInformationQueries.myInformation());

  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyInformationContainer />
      </HydrationBoundary>
    </main>
  );
}
