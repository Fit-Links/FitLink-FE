/* eslint-disable no-magic-numbers */
"use client";

import { PtStatus, ReservationStatus } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
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
import DateController from "@ui/lib/DateController";
import { useEffect, useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

import { useReservationCompletionMutation } from "../../_hooks/mutations/useReservationCompletionMutation";
import ProfileCardFallback from "../Fallback/ProfileCardFallback";

type ReservationOutcomeSheetProps = {
  reservationStatus: Extract<ReservationStatus, "예약 종료" | "예약 확정" | "고정 예약">;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformation: ModifiedReservationListItem;
};

function ReservationOutcomeSheet({
  reservationStatus,
  open,
  onChangeOpen,
  selectedDate,
  memberInformation,
}: ReservationOutcomeSheetProps) {
  const { memberInfo, reservationId } = memberInformation;

  const { name, memberId } = memberInfo;

  const [isReservationCompletionSheetOpen, setIsReservationCompletionSheetOpen] = useState(false);

  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  // const { data: reservationDetail } = useQuery(reservationQueries.detail(reservationId));
  const { data: userInformationDetail, isLoading: userInformationDetailLoading } = useQuery({
    ...userManagementQueries.detail(memberId as number),
    enabled: !!memberId,
  });

  const { reservationCompletion, isSuccess, isPending } = useReservationCompletionMutation();

  const handleClickChangeStatus =
    (status: Extract<PtStatus, "SESSION_NOT_ATTEND" | "SESSION_COMPLETED">) => () => {
      // if (!reservationDetail) return;

      reservationCompletion({
        reservationId,
        memberId: memberId as number,
        isJoin: status === "SESSION_COMPLETED",
      });
    };

  useEffect(() => {
    if (isSuccess) {
      setIsReservationCompletionSheetOpen(true);
      onChangeOpen(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
            {reservationStatus !== "예약 확정" && (
              <Badge className="h-8 w-20">{reservationStatus}</Badge>
            )}
            <VisuallyHidden>
              <SheetDescription>
                이 시트에서 PT 수업에 대한 참석 여부를 처리할 수 있습니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          {userInformationDetailLoading ? (
            <ProfileCardFallback />
          ) : (
            userInformationDetail && (
              <ProfileCard
                imgUrl={userInformationDetail.data.profilePictureUrl}
                userBirth={new Date(userInformationDetail.data.birthDate)}
                userName={name as string}
                phoneNumber={userInformationDetail.data.phoneNumber}
                className="bg-background-sub1 w-full md:hover:bg-none"
              />
            )
          )}
          <SheetFooter>
            {reservationStatus === "예약 확정" ? (
              <div className="flex w-full justify-center gap-[0.625rem]">
                <SheetClose asChild>
                  <Button
                    className="h-[3.375rem] w-full"
                    variant={"secondary"}
                    onClick={handleClickChangeStatus("SESSION_NOT_ATTEND")}
                  >
                    {isPending ? <Spinner /> : "불참석"}
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="h-[3.375rem] w-full"
                    variant={"negative"}
                    onClick={handleClickChangeStatus("SESSION_COMPLETED")}
                  >
                    {isPending ? <Spinner /> : "PT 완료"}
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <SheetClose asChild>
                <Button variant={"secondary"} className="h-[3.375rem] w-full">
                  확인
                </Button>
              </SheetClose>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet
        open={isReservationCompletionSheetOpen}
        onOpenChange={setIsReservationCompletionSheetOpen}
      >
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">회원의 수업 참여 여부가 변경되었습니다</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="h-[3.375rem] w-full">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ReservationOutcomeSheet;
