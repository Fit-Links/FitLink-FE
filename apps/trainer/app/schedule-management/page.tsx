import { Suspense } from "@suspensive/react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cn } from "@ui/lib/utils";
import { startOfWeek, format } from "date-fns";
import { ko } from "date-fns/locale";

import { reservationQueries } from "@trainer/queries/reservation";

import LoadingFallback from "@trainer/components/Fallback/LoadingFallback";
import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import Calendar from "./_components/Calendar";

async function ScheduleManagement() {
  const queryClient = new QueryClient();

  const koreanSunday = startOfWeek(new Date(), { weekStartsOn: 0, locale: ko });
  const simpleDate = format(koreanSunday, "yyyy-MM-dd");

  await queryClient.prefetchQuery(reservationQueries.list(simpleDate));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HeaderProvider>
      <main className={cn(commonLayoutContents)}>
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<LoadingFallback />}>
            <Calendar />
          </Suspense>
        </HydrationBoundary>
      </main>
    </HeaderProvider>
  );
}

export default ScheduleManagement;
