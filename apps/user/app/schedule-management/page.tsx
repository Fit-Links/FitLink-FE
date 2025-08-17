import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cn } from "@ui/lib/utils";
import { Suspense } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import Calendar from "./_components/Calendar";
import ReservationAdder from "./_components/ReservationAdder";
import LoadingFallback from "../../components/Fallback/LoadingFallback";

async function ScheduleManagement() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myInformationQueries.summary());

  return (
    <HeaderProvider>
      {/* TODO: main 및 Calendar 레이아웃 반응형으로 변경하기 */}
      <main className={cn("relative h-[80vh]")}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<LoadingFallback />}>
            <Calendar />
          </Suspense>
          <ReservationAdder />
        </HydrationBoundary>
      </main>
    </HeaderProvider>
  );
}

export default ScheduleManagement;
