/* eslint-disable no-magic-numbers */
import { useQueries, useQuery } from "@tanstack/react-query";
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
import { addDays, format, startOfWeek } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";
import { reservationQueries } from "@trainer/queries/reservation";

import { ReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

import RouteInstance from "@trainer/constants/route";

import { useFixReservationMutation } from "../../_hooks/mutations/useFixReservationMutation";
import { getFixedReservationDatesAndTimes } from "../../_libs/getFixedReservationDatesAndTimes";
import { createNonConflictingFixedReservation } from "../../_utils/fixReservationUtils";

type FixedReservationAdderButtonProps = {
  selectedFixedSchedules: Record<string, string[]>;
  userInformation: { memberId: number; name: string };
};

const currentDate = new Date();

/** 유저 정보와 선택된 고정 예약 시간을 활용하여 고정 예약 mutation 진행 */
function FixedReservationAdderButton({
  userInformation,
  selectedFixedSchedules,
}: FixedReservationAdderButtonProps) {
  const router = useRouter();

  const [isFixedReservationAdderSheetOpen, setIsFixedReservationAdderSheetOpen] = useState(false);

  const fixedReservationDatesAndTimes = getFixedReservationDatesAndTimes(
    selectedFixedSchedules,
    currentDate,
    0,
  );

  const currentWeekMonday = startOfWeek(new Date(), { weekStartsOn: 1 });

  const dates = [0, 14].map((days) => {
    const date = addDays(currentWeekMonday, days);

    return format(date, "yyyy-MM-dd");
  });

  const reservations = useQueries({
    queries: dates.map((date) => reservationQueries.list(date)),
    combine: (data) =>
      data.map(({ data }) => data?.data).flat() as ReservationStatusApiResponse["data"],
  });

  const { data: dayoff } = useQuery(myInformationQueries.dayOff());

  const { fixReservation, isSuccess, isPending } = useFixReservationMutation();

  const handleClickFixReservation = () => {
    if (!dayoff) return;

    const fixedReservationDatesAndTimes = createNonConflictingFixedReservation(
      selectedFixedSchedules,
      currentDate,
      reservations,
      dayoff.data,
      1,
    );

    if (!fixedReservationDatesAndTimes) return;

    fixReservation({
      memberId: userInformation.memberId,
      name: userInformation.name,
      dates: fixedReservationDatesAndTimes,
    });
  };

  const handleClickConfirm = () => {
    router.push(RouteInstance["schedule-management"]());
  };

  useEffect(() => {
    if (isSuccess) {
      setIsFixedReservationAdderSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Button
        className="mb-2 h-[3.375rem] w-full rounded-[0.625rem]"
        disabled={!fixedReservationDatesAndTimes.length}
        onClick={handleClickFixReservation}
      >
        {isPending ? <Spinner /> : "예약"}
      </Button>
      <Sheet
        open={isFixedReservationAdderSheetOpen}
        onOpenChange={setIsFixedReservationAdderSheetOpen}
      >
        <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="flex flex-col items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="whitespace-pre-line text-center">
              {`${userInformation.name} 회원의\nPT 고정 예약이 확정되었습니다`}
            </SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트는 PT 고정 예약 확정 처리가 완료되었음을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="h-[3.375rem] w-full rounded-[0.625rem]"
                onClick={handleClickConfirm}
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

export default FixedReservationAdderButton;
