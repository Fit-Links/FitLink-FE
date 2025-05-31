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
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { ReservationDetailPendingStatus } from "@trainer/services/types/reservations.dto";

import RouteInstance from "@trainer/constants/route";

import { useReservationApproveMutation } from "../../_hooks/mutations/useReservationApproveMutation";

type ApproveButtonProps = {
  selectedMemberInformation: ReservationDetailPendingStatus | null;
  selectedDate: string;
};

function ApproveButton({ selectedMemberInformation, selectedDate }: ApproveButtonProps) {
  const router = useRouter();

  const { reservationApprove } = useReservationApproveMutation();

  const handleSubmitApproveReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedMemberInformation) {
      reservationApprove({
        reservationId: selectedMemberInformation.reservationId,
        memberId: selectedMemberInformation.memberId,
        reservationDate: selectedDate,
      });
    }

    router.push(RouteInstance["schedule-management"]());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <form onSubmit={handleSubmitApproveReservation}>
          <Button disabled={selectedMemberInformation === null} className="w-full" size={"xl"}>
            승인
          </Button>
        </form>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
        <SheetHeader className="flex items-center">
          <div className="bg-brand-primary-500 mb-7 flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full">
            <Icon name="Check" size="lg" />
          </div>
          <SheetTitle>{selectedDate}</SheetTitle>
          <SheetDescription>
            {selectedMemberInformation?.name} 회원의 PT 수업 예약이 완료되었습니다.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="h-[3.375rem] w-full">확인</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ApproveButton;
