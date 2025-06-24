import { Suspense } from "@suspensive/react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { startOfWeek, format } from "date-fns";
import { ko } from "date-fns/locale";

import { reservationQueries } from "@trainer/queries/reservation";

import LoadingFallback from "@trainer/components/Fallback/LoadingFallback";

import { getKoreanDate } from "@trainer/utils/date";

import Calendar from "./_components/Calendar";

async function ScheduleManagement() {
  const queryClient = new QueryClient();

  const koreanSunday = startOfWeek(getKoreanDate(), { weekStartsOn: 0, locale: ko });
  const simpleDate = format(koreanSunday, "yyyy-MM-dd");

  await queryClient.prefetchQuery(reservationQueries.list(simpleDate));
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-full flex-col">
      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<LoadingFallback />}>
          <Calendar />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}

export default ScheduleManagement;
