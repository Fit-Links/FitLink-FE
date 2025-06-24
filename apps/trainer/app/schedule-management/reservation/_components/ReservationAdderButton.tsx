/* eslint-disable no-magic-numbers */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import Spinner from "@ui/components/Spinner";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { format, subHours } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { myInformationQueries } from "@trainer/queries/myInformation";
import { reservationQueries } from "@trainer/queries/reservation";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import RouteInstance from "@trainer/constants/route";

import { filterLatestReservationsByDate } from "../../_utils/reservationMerger";
import { useReservationRequestMutation } from "../_hooks/mutations/useReservationRequestMutation";

type ReservationAdderButtonProps = {
  selectedMemberInformation: PtUser | null;
};

function ReservationAdderButton({ selectedMemberInformation }: ReservationAdderButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isReservationRequestSheetOpen, setIsReservationRequestSheetOpen] = useState(false);

  const selectedDate = searchParams.get("selectedDate") as string;

  const koreanFormattedDate = format(subHours(new Date(selectedDate as string), 9), "yyyy-MM-dd");

  const { data: myInformation } = useSuspenseQuery(myInformationQueries.myInformation());
  const { data: reservationList } = useSuspenseQuery(reservationQueries.list(koreanFormattedDate));

  const filteredReservationList = filterLatestReservationsByDate(reservationList.data);

  const hasExistingReservationOnSameDay = filteredReservationList.some((reservationContent) => {
    if (
      reservationContent.status === "고정 예약" ||
      reservationContent.status === "예약 변경 거절" ||
      reservationContent.status === "예약 변경 요청" ||
      reservationContent.status === "예약 종료" ||
      reservationContent.status === "예약 취소 거절" ||
      reservationContent.status === "예약 취소 요청" ||
      reservationContent.status === "예약 확정"
    ) {
      return reservationContent.reservationDates.some(
        (date) => format(new Date(date), "yyyy-MM-dd") === koreanFormattedDate,
      );
    }

    return false;
  });

  const { reservationRequest, isSuccess, isPending } = useReservationRequestMutation();

  const formattedDate = format(new Date(selectedDate.replace(/GMT.*$/, "")), "yyyy-MM-dd'T'HH:mm");

  const handleClickReservationRequest = () => {
    if (hasExistingReservationOnSameDay) {
      toast.error(`${selectedMemberInformation?.name} 회원의 예약이 이미 같은 날짜에 존재합니다.`);

      return;
    }

    reservationRequest({
      trainerId: myInformation.data?.trainerId,
      memberId: (selectedMemberInformation as PtUser).memberId,
      name: (selectedMemberInformation as PtUser).name,
      dates: [formattedDate],
    });
  };

  const handleClickConfirm = () => {
    router.push(RouteInstance["schedule-management"]());
  };

  useEffect(() => {
    if (isSuccess) {
      setIsReservationRequestSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Button
        className="h-[3.375rem] w-full rounded-[0.625rem]"
        disabled={selectedMemberInformation === null}
        onClick={handleClickReservationRequest}
      >
        {isPending ? <Spinner /> : "예약"}
      </Button>
      <Sheet open={isReservationRequestSheetOpen} onOpenChange={setIsReservationRequestSheetOpen}>
        <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="flex flex-col items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="whitespace-pre-line text-center">
              {`${selectedMemberInformation?.name} 회원의\n예약이 확정되었습니다`}
            </SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트는 예약 확정 처리가 완료되었음을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                onClick={handleClickConfirm}
                className="h-[3.375rem] w-full rounded-[0.625rem]"
              >
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ReservationAdderButton;
