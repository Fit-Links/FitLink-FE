import { ErrorBoundary, Suspense } from "@suspensive/react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Spinner from "@ui/components/Spinner";
import { startOfWeek, format } from "date-fns";
import { ko } from "date-fns/locale";

import { reservationQueries } from "@trainer/queries/reservation";

import CalendarHintGroup from "@trainer/components/CalendarHintGroup";

import Calendar from "./_components/Calendar";

async function ScheduleManagement() {
  const queryClient = new QueryClient();

  const koreanSunday = startOfWeek(new Date(), { weekStartsOn: 0, locale: ko });
  const simpleDate = format(koreanSunday, "yyyy-MM-dd");

  await queryClient.prefetchQuery(reservationQueries.list(simpleDate));
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-full flex-col">
      <HydrationBoundary state={dehydratedState}>
        <div className="py-[0.875rem]">
          <CalendarHintGroup />
        </div>
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<Spinner />}>
            <Calendar />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </main>
  );
}

export default ScheduleManagement;
