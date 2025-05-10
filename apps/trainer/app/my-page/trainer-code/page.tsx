import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import TrainerCodeContainer from "./_components/TrainerCodeContainer";

export default async function TrainnerCode() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myInformationQueries.trainerCode());

  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TrainerCodeContainer />
      </HydrationBoundary>
    </main>
  );
}
