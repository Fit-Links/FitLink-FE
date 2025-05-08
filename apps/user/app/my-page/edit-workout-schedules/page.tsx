import React from "react";

import EditPreferenceTimeContainer from "./_components/EditPreferenceTimeContainer";

export default async function EditWorkoutSchedules() {
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(myInformationQueries.summary());
  // const trainerInfo = queryClient.getQueryData<MyInformationApiResponse>(
  //   myInformationQueries.summary().queryKey,
  // );

  // const trainerId = trainerInfo?.data.trainerId;

  // if (trainerId) {
  //   await queryClient.prefetchQuery(myInformationQueries.trainerAvailableTime(trainerId));
  // }

  // const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-screen w-full flex-col">
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      <EditPreferenceTimeContainer />
      {/* </HydrationBoundary> */}
    </main>
  );
}
