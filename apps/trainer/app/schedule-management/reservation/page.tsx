/* eslint-disable no-magic-numbers */
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Suspense } from "react";

import { reservationQueries } from "@trainer/queries/reservation";
import { userManagementQueries } from "@trainer/queries/userManagement";

import { getKoreanDate } from "@trainer/utils/date";

import MemberListContainer from "../_components/MemberListContainer";
import Header from "./_components/Header";
import ReservationAdderButton from "./_components/ReservationAdderButton";
import MemberContainerFallback from "../_components/Fallback/MemberContainerFallback";

type ReservationProps = {
  searchParams: { selectedDate: string | null; selectedFormatDate: string | null };
};

async function Reservation({ searchParams }: ReservationProps) {
  const selectedDate = searchParams.selectedDate;

  const koreanFormattedDate = format(getKoreanDate(selectedDate as string), "yyyy-MM-dd");

  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchInfiniteQuery(userManagementQueries.list()),
    await queryClient.prefetchQuery(reservationQueries.list(koreanFormattedDate)),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-full flex-col">
      <HydrationBoundary state={dehydratedState}>
        {/** TODO: prerender 오류 방지를 위한 임시 fallback으로 추후 수정 */}
        <Suspense fallback={<></>}>
          <Header />
        </Suspense>
        <Suspense fallback={<MemberContainerFallback />}>
          <MemberListContainer renderFooterReservationButton={ReservationAdderButton} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}

export default Reservation;
