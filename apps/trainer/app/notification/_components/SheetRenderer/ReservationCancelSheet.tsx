import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
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
import { Suspense, useState } from "react";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";
import { userManagementQueries } from "@trainer/queries/userManagement";

import { processCancelReservation } from "@trainer/services/reservations";

import ProfileCard from "@trainer/components/ProfileCard";
import QueryErrorBoundary from "@trainer/components/QueryErrorBoundary";

import SheetErrorFallback from "./SheetErrorFallback";
import SheetFallback from "./SheetFallback";
import { formatSessionData } from "../../_utils/formatter";

type ReservationCancelSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  eventDateDescription: string;
};

type ReservationCancelSheetContentProps = {
  notificationId: number;
  eventDateDescription: string;
  handleDeclineClick: (reservationId: number, userId: number) => () => void;
  handleAcceptClick: (reservationId: number, userId: number) => () => void;
};
function ReservationCancelSheetContent({
  notificationId,
  eventDateDescription,
  handleDeclineClick,
  handleAcceptClick,
}: ReservationCancelSheetContentProps) {
  const { data: notificationDetail } = useSuspenseQuery(notificationQueries.detail(notificationId));
  const {
    refId,
    userDetail: { userId, name, profilePictureUrl, birthDate, phoneNumber },
  } = notificationDetail.data;

  const { data: memberDetail } = useSuspenseQuery(userManagementQueries.detail(userId));
  const {
    sessionInfo: { remainingCount, totalCount },
  } = memberDetail.data;

  return (
    <>
      <SheetHeader className="items-center">
        <SheetTitle className="flex justify-center">PT 예약 취소 요청</SheetTitle>
        <SheetDescription>{eventDateDescription}</SheetDescription>
      </SheetHeader>
      <ProfileCard
        imgUrl={profilePictureUrl}
        userBirth={new Date(birthDate)}
        userName={name as string}
        phoneNumber={phoneNumber}
        className="bg-background-sub1 w-full md:hover:bg-none"
      >
        <Badge variant={"sub2"}>{formatSessionData(remainingCount, totalCount)}</Badge>
      </ProfileCard>
      <SheetFooter>
        <div className="flex w-full justify-center gap-[0.625rem]">
          <SheetClose asChild>
            <Button
              size={"xl"}
              className="w-full"
              variant={"secondary"}
              onClick={handleDeclineClick(refId, userId)}
            >
              거절
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              size={"xl"}
              className="w-full"
              variant={"negative"}
              onClick={handleAcceptClick(refId, userId)}
            >
              승인
            </Button>
          </SheetClose>
        </div>
      </SheetFooter>
    </>
  );
}

function ReservationCancelSheet({
  notificationId,
  open,
  onChangeOpen,
  eventDateDescription,
}: ReservationCancelSheetProps) {
  const queryClient = useQueryClient();

  const reservationCancelMutation = useMutation({
    mutationFn: processCancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() });
    },
  });

  const [isDeclineSheetOpen, setIsDeclineSheetOpen] = useState(false);
  const [isAcceptSheetOpen, setIsAccepSheetOpen] = useState(false);

  const handleDeclineClick = (reservationId: number, userId: number) => () => {
    reservationCancelMutation.mutate({
      requestPath: { reservationId },
      requestBody: {
        memberId: userId,
        isApprove: false,
      },
    });
    setIsDeclineSheetOpen(true);
  };
  const handleAcceptClick = (reservationId: number, userId: number) => () => {
    reservationCancelMutation.mutate({
      requestPath: { reservationId },
      requestBody: {
        memberId: userId,
        isApprove: true,
      },
    });
    setIsAccepSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <QueryErrorBoundary fallback={SheetErrorFallback}>
            <Suspense fallback={<SheetFallback />}>
              <ReservationCancelSheetContent
                notificationId={notificationId}
                eventDateDescription={eventDateDescription}
                handleDeclineClick={handleDeclineClick}
                handleAcceptClick={handleAcceptClick}
              />
            </Suspense>
          </QueryErrorBoundary>
        </SheetContent>
      </Sheet>
      <Sheet open={isDeclineSheetOpen} onOpenChange={setIsDeclineSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">회원의 예약 취소를 거절했습니다</SheetTitle>
            <SheetDescription>회원에게 예약 취소 거절 알림이 전송돼요</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button size={"xl"} className="w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet open={isAcceptSheetOpen} onOpenChange={setIsAccepSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">회원의 예약 취소를 승인했습니다</SheetTitle>
            <SheetDescription>회원에게 예약 취소 승인 알림이 전송돼요</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button size={"xl"} className="w-full">
                확인
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ReservationCancelSheet;
