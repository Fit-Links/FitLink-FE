/* eslint-disable no-magic-numbers */
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { format, subHours } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import RouteInstance from "@trainer/constants/route";

import { useReservationRequestMutation } from "../_hooks/mutations/useReservationRequestMutation";

type ReservationAdderButtonProps = {
  selectedMemberInformation: PtUser | null;
};

function ReservationAdderButton({ selectedMemberInformation }: ReservationAdderButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { data: myInformation } = useSuspenseQuery(myInformationQueries.myInformation());

  const { reservationRequest } = useReservationRequestMutation();

  const selectedDate = searchParams.get("selectedDate") as string;
  const dateObj = new Date(selectedDate);
  const koreanDate = subHours(dateObj, 9);
  const formattedDate = format(koreanDate, "yyyy-MM-dd'T'HH:mm");

  /** TODO: 특정 회원을 선택하고 나면 그 회원의 정보를 바탕으로 직접 예약 요청 API 호출 */
  const handleClickReservationRequest = () => {
    reservationRequest({
      trainerId: myInformation.data?.trainerId,
      memberId: (selectedMemberInformation as PtUser).memberId,
      name: (selectedMemberInformation as PtUser).name,
      dates: [formattedDate],
    });

    router.push(RouteInstance["schedule-management"]());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="h-[3.375rem] w-full rounded-[0.625rem]"
          disabled={selectedMemberInformation === null}
          onClick={handleClickReservationRequest}
        >
          예약
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader className="flex flex-col items-center">
          <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
            <Icon name="Check" size="lg" />
          </Button>
          <SheetTitle className="whitespace-pre-line text-center">
            {`${selectedMemberInformation?.name} 회원의\n예약이 확정되었습니다`}
          </SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="h-[3.375rem] w-full rounded-[0.625rem]">확인</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ReservationAdderButton;
