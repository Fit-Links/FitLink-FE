import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import MyAvailableTimeContainer from "./_components/MyAvailableTimeContainer";
import MyDayOffContainer from "./_components/MyDayOffContainer";
import MyPageContainer from "./_components/MyPageContainer";

export default async function page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(myInformationQueries.myInformation()),
    queryClient.prefetchQuery(myInformationQueries.ptAvailableTime()),
    queryClient.prefetchQuery(myInformationQueries.dayOff()),
  ]);

  return (
    <main className="bg-background-primary text-text-primary h-screen w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPageContainer />
        <MyAvailableTimeContainer />
        <MyDayOffContainer />
      </HydrationBoundary>
    </main>
  );
}
