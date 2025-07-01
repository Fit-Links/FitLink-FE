/* eslint-disable no-magic-numbers */

import { format } from "date-fns";

import { getKoreanDate } from "@trainer/utils/date";

import Header from "./_components/Header";
import PendingReservationContainer from "./_components/PendingReservationContainer";

type PendingReservationsProps = {
  searchParams: { selectedDate: string; formattedSelectedDate: string };
};

/** TODO: url 상태로 유저 리스트 정보를 받는 것이 아닌 API 요청으로 받기
 * 해당 페이지로 선택된 예약 블록의 reservationId를 받아서 조회하기
 */
async function PendingReservations({ searchParams }: PendingReservationsProps) {
  const selectedDate = getKoreanDate(searchParams.selectedDate);

  const formattedAdjustedDate = format(selectedDate, "yyyy-MM-dd'T'HH:mm");

  const koreanDateTimeFormat = searchParams.formattedSelectedDate;

  return (
    <main className="flex h-full flex-col">
      <Header />
      <PendingReservationContainer
        emptyErrorCheckSelectedDate={selectedDate}
        formattedAdjustedDate={formattedAdjustedDate}
        selectedDate={koreanDateTimeFormat}
      />
    </main>
  );
}

export default PendingReservations;
