"use client";

import { ReservationStatus } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import { Input } from "@ui/components/Input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

import { useFixedReservationTerminateMutation } from "../../_hooks/mutations/useFixedReservationTerminateMutation";
import { useReservationCancelMutation } from "../../_hooks/mutations/useReservationCancelMutation";

type ReservationControlSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformation: ModifiedReservationListItem;
  reservationStatus?: Extract<ReservationStatus, "예약 확정" | "고정 예약">;
};

/** TODO: 현재 시점과 비교하여 확정된 예약이 미래 예약이라면 해당 바텀시트를 나타냄(예약 취소/닫기) */
function ReservationControlSheet({
  open,
  onChangeOpen,
  selectedDate,
  memberInformation,
  reservationStatus,
}: ReservationControlSheetProps) {
  const { memberInfo, reservationId } = memberInformation;

  /** TODO: memberId로 특정 회원의 상세 정보를 불러와 이미지,번호,생일,총 PT횟수, 잔여 PT 횟수 불러오기 */
  const { memberId } = memberInfo;
  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const [inputValue, setInputValue] = useState("");
  const [isTerminateFixedReservationDialogOpen, setIsTerminateFixedReservationDialogOpen] =
    useState(false);
  const [isReservationCancelSheetOpen, setIsReservationCancelSheetOpen] = useState(false);
  const [isReservationCancelSuccessSheetOpen, setIsReservationCancelSuccessSheetOpen] =
    useState(false);

  const { data: userInformationDetail } = useQuery({
    ...userManagementQueries.detail(memberId as number),
    enabled: !!memberId,
  });

  const { reservationCancel } = useReservationCancelMutation();
  const { terminateFixedReservation } = useFixedReservationTerminateMutation();

  const handleClickReservationCancelSheetOpen = () => {
    setIsReservationCancelSheetOpen(true);
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  /** TODO:  예약 취소 버튼 클릭 시 예약 취소 API 호출 */
  const handleClickReservationCancelSuccessSheetOpen = () => {
    reservationCancel({
      reservationId: reservationId,
      cancelReason: inputValue,
      cancelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
    });
    setIsReservationCancelSuccessSheetOpen(true);
  };

  const handleClickTerminateFixedReservationDialogOpen = () => {
    setIsTerminateFixedReservationDialogOpen(true);
  };

  const handleClickTerminateFixedReservation = () => {
    terminateFixedReservation(reservationId);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
            <div className="flex items-center justify-center gap-2">
              {reservationStatus && <Badge className="h-8 w-24">{reservationStatus}</Badge>}
              {reservationStatus === "고정 예약" && (
                <Badge
                  onClick={handleClickTerminateFixedReservationDialogOpen}
                  className="h-8 w-24 hover:cursor-pointer"
                  variant={"destructive"}
                >
                  {"고정 예약 해제"}
                </Badge>
              )}
            </div>
          </SheetHeader>
          {userInformationDetail && (
            /** TODO: 현재 회원 상세 정보가 기존과 다르게 내려오고 있음. 특시 회원의 전화번호, 생일 데이터가 없음 */
            <ProfileCard
              imgUrl={userInformationDetail.data.profilePictureUrl}
              userBirth={new Date(userInformationDetail.data.birthDate)}
              userName={userInformationDetail.data.name}
              phoneNumber={userInformationDetail.data.phoneNumber}
              className="bg-background-sub1 w-full hover:bg-none"
            />
          )}

          <SheetFooter>
            <div className="flex w-full justify-center gap-[0.625rem]">
              <SheetClose asChild>
                <Button
                  className="h-[3.375rem] w-full"
                  variant={"secondary"}
                  onClick={handleClickReservationCancelSheetOpen}
                >
                  예약 취소
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button className="h-[3.375rem] w-full" variant={"negative"}>
                  닫기
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/** TODO: reservationId를 사용하여 예약 취소 API 붙히기 */}
      <Sheet open={isReservationCancelSheetOpen} onOpenChange={setIsReservationCancelSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader>
            <SheetTitle className="text-center">예약 취소</SheetTitle>
            <SheetDescription className="text-center">
              예약을 취소하려는 사유를 입력해주세요
            </SheetDescription>
            <Input
              value={inputValue}
              onChange={handleChangeInputValue}
              className="mt-5 h-[2.813rem] w-full"
              placeholder="취소 사유"
            />
            <p className="text-body-1 text-text-sub3 mt-5 whitespace-pre-line text-center">{`홍길동 회원에게\n사유와 함께 예약 취소 알림이 전송돼요`}</p>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                disabled={!inputValue.length}
                className="disabled:bg-background-sub1 h-[3.375rem] w-full"
                onClick={handleClickReservationCancelSuccessSheetOpen}
              >
                예약 취소
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet
        open={isReservationCancelSuccessSheetOpen}
        onOpenChange={setIsReservationCancelSuccessSheetOpen}
      >
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">PT 예약이 취소되었습니다</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button className="h-[3.375rem] w-full">확인</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Dialog
        open={isTerminateFixedReservationDialogOpen}
        onOpenChange={setIsTerminateFixedReservationDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>고정 예약 해제</DialogTitle>
          </DialogHeader>
          <DialogDescription className="whitespace-pre-line text-center">
            {
              "현재 선택된 회원의 타임 블록과\n같은 요일/시간에 해당하는 모든 고정 예약이 해제됩니다."
            }
          </DialogDescription>
          <DialogFooter>
            <DialogClose className="flex w-full justify-center gap-2">
              <Button className="w-full" variant={"secondary"}>
                취소
              </Button>
              <Button onClick={handleClickTerminateFixedReservation} className="w-full">
                고정 예약 해제
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReservationControlSheet;
