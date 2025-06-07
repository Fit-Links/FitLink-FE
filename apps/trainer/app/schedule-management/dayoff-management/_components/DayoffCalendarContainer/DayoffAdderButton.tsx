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
  SheetTrigger,
} from "@ui/components/Sheet";
import Spinner from "@ui/components/Spinner";
import DateController from "@ui/lib/DateController";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import RouteInstance from "@trainer/constants/route";

import { useDayoffAddMutation } from "../../_hooks/mutations/useDayoffAddMutation";

type DayoffAdderButtonProps = {
  selectedDate?: Date;
};

function DayoffAdderButton({ selectedDate }: DayoffAdderButtonProps) {
  const router = useRouter();

  const { addDayoff, isSuccess, isPending } = useDayoffAddMutation();

  const [isDayoffAdderSheetOpen, setIsDayoffAdderSheetOpen] = useState(false);

  const formatDate = selectedDate && DateController(selectedDate).toServiceFormat().untilDate;

  /** TODO: 버튼 클릭 시 휴무일 추가 API 붙히기 */
  const handleClickDayoffAdder = () => {
    const validateDate = format(selectedDate as Date, "yyyy-MM-dd");

    addDayoff([validateDate]);
  };

  const handleClickCloseDayoffAdderSheet = () => {
    router.push(RouteInstance["schedule-management"]());
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDayoffAdderSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Button
        onClick={handleClickDayoffAdder}
        disabled={!selectedDate}
        className="h-[3.375rem] w-full"
      >
        {isPending ? <Spinner /> : "확인"}
      </Button>
      <Sheet open={isDayoffAdderSheetOpen} onOpenChange={setIsDayoffAdderSheetOpen}>
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="flex items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="flex justify-center">휴무일이 설정되었습니다</SheetTitle>
            <SheetDescription className="flex justify-center">
              휴무일은 회원에게 예약 불가로 표시돼요
            </SheetDescription>
          </SheetHeader>
          <div className="text-headline bg-background-sub1 flex h-[5.625rem] w-full flex-col items-center justify-center rounded-[0.625rem]">
            {formatDate} 하루종일
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleClickCloseDayoffAdderSheet} className="h-[3.375rem] w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default DayoffAdderButton;
