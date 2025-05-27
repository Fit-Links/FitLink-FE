/* eslint-disable no-magic-numbers */
/** TODO: 예약 대기 내역 구현이 완료되지 않아 에러 방지를 위한 주석 처리 */
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { format, subHours } from "date-fns";

import { myInformationQueries } from "@trainer/queries/myInformation";
import { reservationQueries } from "@trainer/queries/reservation";

import { getQueryClient } from "@trainer/components/Providers/getQueryClient";

import Header from "./_components/Header";
import PendingReservationContainer from "./_components/PendingReservationContainer";

type PendingReservationsProps = {
  searchParams: { selectedDate: string; formattedSelectedDate: string };
};

/** TODO: url 상태로 유저 리스트 정보를 받는 것이 아닌 API 요청으로 받기
 * 해당 페이지로 선택된 예약 블록의 reservationId를 받아서 조회하기
 */
async function PendingReservations({ searchParams }: PendingReservationsProps) {
  const queryClient = getQueryClient();

  const selectedDate = new Date(searchParams.selectedDate);

  const adjustedDate = subHours(selectedDate, 9);
  const formattedAdjustedDate = format(adjustedDate, "yyyy-MM-dd'T'HH:mm");

  const koreanDateTimeFormat = searchParams.formattedSelectedDate;

  await Promise.all([
    queryClient.prefetchQuery(reservationQueries.pendingDetail(formattedAdjustedDate)),
    queryClient.prefetchQuery(myInformationQueries.myInformation()),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex h-full flex-col">
      <HydrationBoundary state={dehydratedState}>
        <Header />
        <PendingReservationContainer
          formattedAdjustedDate={formattedAdjustedDate}
          selectedDate={koreanDateTimeFormat}
        />
      </HydrationBoundary>
    </main>
  );
}

export default PendingReservations;
