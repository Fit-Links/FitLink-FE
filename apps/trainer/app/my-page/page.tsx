import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyPageContainer from "./_components/MyPageContainer";

export default async function page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(myInformationQueries.myInformation()),
    queryClient.prefetchQuery(myInformationQueries.ptAvailableTime()),
  ]);

  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageContainer />
        <MyAvailableTimeContainer />
      </HydrationBoundary>
    </main>
  );
}
