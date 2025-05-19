import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { myInformationQueries } from "@user/queries/myInformation";

import Calendar from "./_components/Calendar";
import ReservationAdder from "./_components/ReservationAdder";

async function ScheduleManagement() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myInformationQueries.summary());

  return (
    <main className="relative flex h-full w-full justify-center overflow-y-auto">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Calendar />
        <ReservationAdder />
      </HydrationBoundary>
    </main>
  );
}

export default ScheduleManagement;
