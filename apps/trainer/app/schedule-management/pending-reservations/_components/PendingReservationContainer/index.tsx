"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import FixedReservationListFallback from "@trainer/app/schedule-management/_components/Fallback/FixedReservationListFallback";
import { reservationQueries } from "@trainer/queries/reservation";

import { ReservationDetailPendingStatus } from "@trainer/services/types/reservations.dto";

import ApproveButton from "./ApproveButton";
import MemberCardList from "./MemberCardList";

type PendingReservationContainerProps = {
  formattedAdjustedDate: string;
  selectedDate: string;
  emptyErrorCheckSelectedDate: Date;
};

function PendingReservationContainer({
  formattedAdjustedDate,
  selectedDate,
  emptyErrorCheckSelectedDate,
}: PendingReservationContainerProps) {
  const [selectedMemberInformation, setSelectedMemberInformation] =
    useState<ReservationDetailPendingStatus | null>(null);

  console.log("쿼리파람 SelectedDate 체크:", emptyErrorCheckSelectedDate);

  // const NINE_HOURS = 9;
  // const isProduction = process.env.NODE_ENV === "production";
  // const adjustedDate = isProduction
  //   ? addHours(new Date(formattedAdjustedDate), NINE_HOURS)
  //   : new Date(formattedAdjustedDate);
  // const formattedDate = format(adjustedDate, "yyyy-MM-dd'T'HH:mm");

  const { data: reservationPendingList, isLoading } = useQuery(
    reservationQueries.pendingDetail(formattedAdjustedDate),
  );

  console.log("예약 대기 리스트 확인용 콘솔:", reservationPendingList);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden pt-[1.688rem]">
      <section className="bg-background-sub1 flex h-[5.625rem] w-full flex-col items-center justify-center gap-[0.625rem] rounded-[0.625rem] px-[1.938rem] py-[1.125rem]">
        <p className="text-headline">{selectedDate}</p>
        <p className="text-body-1">
          해당 시간에 PT 예약을 요청한 회원
          <span className="bg-brand-secondary-500 text-body-1 text-text-sub5 mx-1 rounded-[0.625rem] px-[0.625rem] py-1">
            {reservationPendingList?.data.length}명
          </span>
          입니다
        </p>
      </section>
      <section className="mb-[0.625rem] mt-[1.563rem] flex h-full flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <p className="text-body-3  w-full text-left">해당 시간에만 가능한 회원</p>
        {isLoading ? (
          <FixedReservationListFallback />
        ) : (
          reservationPendingList && (
            <>
              <MemberCardList
                reservationPendingList={reservationPendingList.data}
                hasOtherReservations={false}
                selectedMemberInformation={selectedMemberInformation}
                onChangeSelectMemberInformation={setSelectedMemberInformation}
              />
              <p className="text-body-3 mt-[1.563rem] w-full text-left">
                다른 시간에도 가능한 회원
              </p>
              <MemberCardList
                reservationPendingList={reservationPendingList.data}
                selectedDate={selectedDate}
                hasOtherReservations={true}
                selectedMemberInformation={selectedMemberInformation}
                onChangeSelectMemberInformation={setSelectedMemberInformation}
              />
            </>
          )
        )}
      </section>
      <ApproveButton
        selectedMemberInformation={selectedMemberInformation}
        selectedDate={formattedAdjustedDate}
      />
    </section>
  );
}

export default PendingReservationContainer;
