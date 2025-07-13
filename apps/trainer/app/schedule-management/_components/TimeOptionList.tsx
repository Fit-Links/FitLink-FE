/* eslint-disable no-magic-numbers */
"use client";

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
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RouteInstance from "@trainer/constants/route";

import TimeOption from "./TimeOption";
import { useReservationNotAllowMutation } from "../_hooks/mutations/useReservationNotAllowMutation";

type TimeOptionListProps = {
  selectedDate: Date;
  selectedFormatDate: string;
  onChangeOpen: (isOpen: boolean) => void;
};

type Route = keyof typeof RouteInstance;

export default function TimeOptionList({
  selectedDate,
  selectedFormatDate,
  onChangeOpen,
}: TimeOptionListProps) {
  const router = useRouter();

  const [isReservationNotAllowSheetOpen, setIsReservationNotAllowSheetOpen] = useState(false);

  const { reservationNotAllow, isSuccess, isPending } = useReservationNotAllowMutation();

  const handleClickTimeOption = (
    route: Extract<Route, "reservation" | "fixed-reservation" | "dayoff-management">,
  ) => {
    switch (route) {
      case "reservation":
        router.push(
          RouteInstance.reservation("", {
            selectedFormatDate: selectedFormatDate,
            selectedDate: String(selectedDate),
          }),
        );
        break;
      case "fixed-reservation":
        router.push(RouteInstance["fixed-reservation"]());
        break;
      case "dayoff-management":
        router.push(RouteInstance["dayoff-management"]());
    }
  };

  const handleCloseScheduleBottomSheet = () => {
    reservationNotAllow({
      date: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsReservationNotAllowSheetOpen(true);

      setTimeout(() => {
        onChangeOpen(false);
      }, 500);
    }
  }, [isSuccess]);

  return (
    <div className="mb-[1.625rem] ml-[1.063rem] mt-[1.25rem] flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <TimeOption className="flex-1" onClick={() => handleClickTimeOption("reservation")}>
        <TimeOption.Icon iconName={"Dumbbell"} />
        <TimeOption.Content>
          <div>PT 예약</div>
        </TimeOption.Content>
      </TimeOption>

      <TimeOption className="flex-1" onClick={() => handleClickTimeOption("fixed-reservation")}>
        <TimeOption.Icon iconName={"CalendarClock"} />
        <TimeOption.Content>
          <div>PT</div>
          <div>고정 예약</div>
        </TimeOption.Content>
      </TimeOption>

      <TimeOption className="flex-1" onClick={handleCloseScheduleBottomSheet}>
        <TimeOption.Icon iconName={"CalendarX2"} />
        <TimeOption.Content>
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <div>예약 불가</div>
              <div>시간대 등록</div>
            </>
          )}
        </TimeOption.Content>
      </TimeOption>

      <TimeOption className="flex-1" onClick={() => handleClickTimeOption("dayoff-management")}>
        <TimeOption.Icon iconName={"CalendarMinus"} />
        <TimeOption.Content>
          <div>휴무일</div>
          <div>설정</div>
        </TimeOption.Content>
      </TimeOption>

      <Sheet open={isReservationNotAllowSheetOpen} onOpenChange={setIsReservationNotAllowSheetOpen}>
        <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="flex flex-col items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="whitespace-pre-line text-center">
              {`예약 불가 시간이\n등록 완료되었습니다`}
            </SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트는 예약 불가 시간 등록이 완료되었을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="h-[3.375rem] w-full rounded-[0.625rem]">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
