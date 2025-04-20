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

import { PtUser } from "@trainer/services/types/userManagement.dto";

import { getFixedReservationDatesAndTimes } from "../../_libs/getFixedReservationDatesAndTimes";

type FixedReservationAdderButtonProps = {
  selectedFixedSchedules: Record<string, string[]>;
  userInformation: PtUser;
};

/** 유저 정보와 선택된 고정 예약 시간을 활용하여 고정 예약 mutation 진행 */
function FixedReservationAdderButton({
  userInformation,
  selectedFixedSchedules,
}: FixedReservationAdderButtonProps) {
  const fixedReservationDatesAndTimes = getFixedReservationDatesAndTimes(
    selectedFixedSchedules,
    new Date(),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="h-[3.375rem] w-full rounded-[0.625rem]"
          disabled={!fixedReservationDatesAndTimes.length}
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
            <Button className="h-[3.375rem] w-full rounded-[0.625rem]">확인</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default FixedReservationAdderButton;
