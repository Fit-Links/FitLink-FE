/* eslint-disable no-magic-numbers */
import { useQuery } from "@tanstack/react-query";
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
import { addDays, format, startOfWeek } from "date-fns";
import { useRouter } from "next/navigation";

import { myInformationQueries } from "@trainer/queries/myInformation";
import { reservationQueries } from "@trainer/queries/reservation";

import { GetDayoffApiResponse } from "@trainer/services/types/myInformation.dto";
import { ReservationStatusApiResponse } from "@trainer/services/types/reservations.dto";

import RouteInstance from "@trainer/constants/route";

import { useFixReservationMutation } from "../../_hooks/mutations/useFixReservationMutation";
import { getFixedReservationDatesAndTimes } from "../../_libs/getFixedReservationDatesAndTimes";

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

  const fixedReservationDatesAndTimes = getFixedReservationDatesAndTimes(
    selectedFixedSchedules,
    currentDate,
    1,
  );

  const currentWeekMonday = startOfWeek(new Date(), { weekStartsOn: 1 });

  // 다음 주 월요일 (다음 주 시작일)
  const nextWeekMonday = addDays(currentWeekMonday, 7);
  const nextWeekMondayFormatted = format(nextWeekMonday, "yyyy-MM-dd");

  const { data: reservations } = useQuery(reservationQueries.list(nextWeekMondayFormatted));
  const { data: dayoff } = useQuery(myInformationQueries.dayOff());

  const { fixReservation } = useFixReservationMutation();

  const checkForReservationConflicts = (
    dates: string[],
    reservations: ReservationStatusApiResponse["data"],
    dayoff: GetDayoffApiResponse["data"],
  ) => {
    const isConflicts = reservations.filter(({ status, reservationDates }) => {
      if (status === "예약 확정" || status === "고정 예약" || status === "예약 불가 설정") {
        return dates.some((date) => {
          const newDateString = `${date}:00`;

          return reservationDates.includes(newDateString);
        });
      }

      return false;
    });

    if (isConflicts.length === 0) {
      return dayoff.filter(({ dayOffDate }) => {
        return dates.some((date) => {
          const newDateString = date.split("T")[0];

          return dayOffDate === newDateString;
        });
      });
    }

    return isConflicts;
  };

  const createNonConflictingFixedReservation = (depth: number): string[] | undefined => {
    if (!reservations || !dayoff) return;

    const fixedReservationDatesAndTimes = getFixedReservationDatesAndTimes(
      selectedFixedSchedules,
      currentDate,
      depth,
    );

    const reservationConflicts = checkForReservationConflicts(
      fixedReservationDatesAndTimes,
      reservations.data,
      dayoff.data,
    );

    if (reservationConflicts.length > 0) {
      return createNonConflictingFixedReservation(depth + 1);
    }

    return fixedReservationDatesAndTimes;
  };

  const handleClickFixReservation = () => {
    const fixedReservationDatesAndTimes = createNonConflictingFixedReservation(1);

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="h-[3.375rem] w-full rounded-[0.625rem]"
          disabled={!fixedReservationDatesAndTimes.length}
          onClick={handleClickFixReservation}
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
            {`${userInformation.name} 회원의\nPT 고정 예약이 확정되었습니다`}
          </SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="h-[3.375rem] w-full rounded-[0.625rem]" onClick={handleClickConfirm}>
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FixedReservationAdderButton;
