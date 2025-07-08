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
import Spinner from "@ui/components/Spinner";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import DateController from "@ui/lib/DateController";
import { format } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

import { useFixedReservationTerminateMutation } from "../../_hooks/mutations/useFixedReservationTerminateMutation";
import { useReservationCancelMutation } from "../../_hooks/mutations/useReservationCancelMutation";
import ProfileCardFallback from "../Fallback/ProfileCardFallback";

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

  const { memberId } = memberInfo;
  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const [inputValue, setInputValue] = useState("");
  const [isTerminateFixedReservationDialogOpen, setIsTerminateFixedReservationDialogOpen] =
    useState(false);
  const [isReservationCancelSheetOpen, setIsReservationCancelSheetOpen] = useState(false);
  const [isReservationCancelSuccessSheetOpen, setIsReservationCancelSuccessSheetOpen] =
    useState(false);
  const [isTerminateFixedReservationSheetOpen, setIsTerminateFixedReservationSheetOpen] =
    useState(false);
  const [isFixedReservationChangePopupOpen, setIsFixedReservationChangePopupOpen] = useState(false);

  const { data: userInformationDetail, isLoading: userInformationDetailLoading } = useQuery({
    ...userManagementQueries.detail(memberId as number),
    enabled: !!memberId,
  });

  const {
    reservationCancel,
    isSuccess: reservationCancelSuccess,
    isPending: reservationCancelPending,
  } = useReservationCancelMutation();
  const {
    terminateFixedReservation,
    isSuccess: terminateFixedReservationSuccess,
    isPending: terminateFixedReservationPending,
  } = useFixedReservationTerminateMutation();

  const handleClickReservationCancelSheetOpen = () => {
    setIsReservationCancelSheetOpen(true);
  };

  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickReservationCancelSuccessSheetOpen = () => {
    reservationCancel({
      reservationId: reservationId,
      cancelReason: inputValue,
      cancelDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
    });
  };

  const handleClickTerminateFixedReservationDialogOpen = () => {
    setIsTerminateFixedReservationDialogOpen(true);
  };

  const handleClickTerminateFixedReservation = () => {
    terminateFixedReservation(reservationId);
  };

  const handleClickChangeFixedReservation = () => {
    const url = new URL(window.location.href);
    url.searchParams.set(
      "fixReservationChangeMode",
      JSON.stringify({
        reservationId: reservationId,
        reservationDate: format(selectedDate, "yyyy-MM-dd'T'HH:mm"),
      }),
    );
    window.history.pushState({}, "", url);

    onChangeOpen(false);
    setIsFixedReservationChangePopupOpen(true);
  };

  useEffect(() => {
    if (reservationCancelSuccess) {
      setIsReservationCancelSuccessSheetOpen(true);
    }
    if (terminateFixedReservationSuccess) {
      setIsTerminateFixedReservationSheetOpen(true);
    }
  }, [reservationCancelSuccess, terminateFixedReservationSuccess]);

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트에서 예약과 관련된 기능을 확인 및 사용할 수 있습니다.
              </SheetDescription>
            </VisuallyHidden>
            <div className="flex items-center justify-center gap-2">
              {reservationStatus === "고정 예약" ? (
                <Badge
                  onClick={handleClickChangeFixedReservation}
                  className="h-8 w-24 hover:cursor-pointer"
                >
                  {"고정 예약 변경"}
                </Badge>
              ) : (
                <Badge className="h-8 w-24">{reservationStatus}</Badge>
              )}
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
          {userInformationDetailLoading ? (
            <ProfileCardFallback />
          ) : (
            userInformationDetail && (
              <ProfileCard
                imgUrl={userInformationDetail.data.profilePictureUrl}
                userBirth={new Date(userInformationDetail.data.birthDate)}
                userName={userInformationDetail.data.name}
                phoneNumber={userInformationDetail.data.phoneNumber}
                className="bg-background-sub1 w-full md:hover:bg-none"
              />
            )
          )}
          <SheetFooter>
            <div className="flex w-full justify-center gap-[0.625rem]">
              <Button
                className="h-[3.375rem] w-full"
                variant={"secondary"}
                onClick={handleClickReservationCancelSheetOpen}
              >
                예약 취소
              </Button>
              <SheetClose asChild>
                <Button className="h-[3.375rem] w-full" variant={"negative"}>
                  닫기
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={isReservationCancelSheetOpen} onOpenChange={setIsReservationCancelSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
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
            <Button
              disabled={!inputValue.length}
              className="disabled:bg-background-sub1 h-[3.375rem] w-full"
              onClick={handleClickReservationCancelSuccessSheetOpen}
            >
              {reservationCancelPending ? <Spinner /> : "예약 취소"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet
        open={isReservationCancelSuccessSheetOpen}
        onOpenChange={setIsReservationCancelSuccessSheetOpen}
      >
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">PT 예약이 취소되었습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트는 PT 예약 취소 처리가 완료되었음을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <Button className="h-[3.375rem] w-full">확인</Button>
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
            <VisuallyHidden>
              <DialogDescription>
                이 시트에서 설정되어 있는 고정 예약을 해제할 수 있습니다.
              </DialogDescription>
            </VisuallyHidden>
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
                {terminateFixedReservationPending ? <Spinner /> : "고정 예약 해제"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Sheet
        open={isTerminateFixedReservationSheetOpen}
        onOpenChange={setIsTerminateFixedReservationSheetOpen}
      >
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">고정 예약이 해제되었습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트는 고정 예약 해제 처리가 완료되었음을 알려줍니다.
              </SheetDescription>
            </VisuallyHidden>
          </SheetHeader>
          <SheetFooter>
            <Button className="h-[3.375rem] w-full">확인</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <Dialog
        open={isFixedReservationChangePopupOpen}
        onOpenChange={setIsFixedReservationChangePopupOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>고정 예약 변경 날짜 선택</DialogTitle>
            <DialogDescription className="whitespace-pre-line text-center">
              {`시간 블록을 선택하면 고정 예약이 변경됩니다\n변경을 원하지 않을 시에는 상단의\n[고정 예약 변경 비활성화] 버튼을 눌러\n변경을 취소할 수 있습니다`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full">확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReservationControlSheet;
