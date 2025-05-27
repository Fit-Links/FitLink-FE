"use client";

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
import { format } from "date-fns";
import { useRouter } from "next/navigation";

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

  const { reservationNotAllow } = useReservationNotAllowMutation();

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
    onChangeOpen(false);
  };

  // TODO: 추후 각 TimeOption 클릭 시 이동할 페이지의 경로 Name이 정해지면 클릭 이벤트 추가
  return (
    <div className="mb-[1.625rem] ml-[1.063rem] mt-[1.25rem] flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <TimeOption onClick={() => handleClickTimeOption("reservation")}>
        <TimeOption.Icon iconName={"Dumbbell"} />
        <TimeOption.Content>
          <div>PT 예약</div>
        </TimeOption.Content>
      </TimeOption>

      <TimeOption onClick={() => handleClickTimeOption("fixed-reservation")}>
        <TimeOption.Icon iconName={"CalendarClock"} />
        <TimeOption.Content>
          <div>PT</div>
          <div>고정 예약</div>
        </TimeOption.Content>
      </TimeOption>

      <Sheet>
        <SheetTrigger asChild>
          <TimeOption>
            <TimeOption.Icon iconName={"CalendarX2"} />
            <TimeOption.Content onClick={handleCloseScheduleBottomSheet}>
              <div>예약 불가</div>
              <div>시간대 등록</div>
            </TimeOption.Content>
          </TimeOption>
        </SheetTrigger>
        <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="flex flex-col items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="whitespace-pre-line text-center">
              {`예약 불가 시간이\n등록 완료되었습니다`}
            </SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="h-[3.375rem] w-full rounded-[0.625rem]">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <TimeOption onClick={() => handleClickTimeOption("dayoff-management")}>
        <TimeOption.Icon iconName={"CalendarMinus"} />
        <TimeOption.Content>
          <div>휴무일</div>
          <div>설정</div>
        </TimeOption.Content>
      </TimeOption>
    </div>
  );
}
