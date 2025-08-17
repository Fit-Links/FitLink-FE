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
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { ReservationDetailPendingStatus } from "@trainer/services/types/reservations.dto";

import RouteInstance from "@trainer/constants/route";

import { useReservationApproveMutation } from "../../_hooks/mutations/useReservationApproveMutation";

type ApproveButtonProps = {
  selectedMemberInformation: ReservationDetailPendingStatus | null;
  selectedDate: string;
};

function ApproveButton({ selectedMemberInformation, selectedDate }: ApproveButtonProps) {
  const router = useRouter();

  const [isApproveSheetOpen, setIsApproveSheetOpen] = useState(false);

  const { reservationApprove, isSuccess, isPending } = useReservationApproveMutation();

  const handleSubmitApproveReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedMemberInformation) {
      reservationApprove({
        reservationId: selectedMemberInformation.reservationId,
        memberId: selectedMemberInformation.memberId,
        reservationDate: selectedDate,
      });
    }
  };

  const handleClickCloseApproveSheet = () => {
    router.push(RouteInstance["schedule-management"]());
  };

  const formattedDate = format(parseISO(selectedDate), "M월 d일 (E) a h시", { locale: ko });

  useEffect(() => {
    if (isSuccess) {
      setIsApproveSheetOpen(true);
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmitApproveReservation}>
        <Button disabled={selectedMemberInformation === null} className="w-full" size={"xl"}>
          {isPending ? <Spinner /> : "승인"}
        </Button>
      </form>
      <Sheet open={isApproveSheetOpen} onOpenChange={setIsApproveSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="flex items-center">
            <div className="bg-brand-primary-500 mb-7 flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
              <Icon name="Check" size="lg" />
            </div>
            <SheetTitle>{formattedDate}</SheetTitle>
            <SheetDescription>
              {selectedMemberInformation?.name} 회원의 PT 수업 예약이 완료되었습니다.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleClickCloseApproveSheet} className="h-[3.375rem] w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ApproveButton;
