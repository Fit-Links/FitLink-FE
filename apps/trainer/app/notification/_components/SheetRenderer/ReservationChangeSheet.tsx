import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
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
import DateController from "@ui/lib/DateController";
import { Suspense, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";
import { userManagementQueries } from "@trainer/queries/userManagement";

import { processReservationChange } from "@trainer/services/reservations";

import ProfileCard from "@trainer/components/ProfileCard";
import QueryErrorBoundary from "@trainer/components/QueryErrorBoundary";

import SheetErrorFallback from "./SheetErrorFallback";
import SheetFallback from "./SheetFallback";
import { formatSessionData } from "../../_utils/formatter";

type ReservationChangeSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  eventDateDescription: string;
};

type ReservationChangeSheetContentProps = {
  notificationId: number;
  eventDateDescription: string;
  handleDeclineClick: (reservationId: number, userId: number) => () => void;
  handleAcceptClick: (reservationId: number, userId: number) => () => void;
};
function ReservationChangeSheetContent({
  notificationId,
  eventDateDescription,
  handleDeclineClick,
  handleAcceptClick,
}: ReservationChangeSheetContentProps) {
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
        <SheetTitle className="flex justify-center">PT 예약 변경</SheetTitle>
        <SheetDescription>{eventDateDescription}</SheetDescription>
      </SheetHeader>
      <ProfileCard
        imgUrl={profilePictureUrl}
        userBirth={new Date(birthDate)}
        userName={name as string}
        phoneNumber={phoneNumber}
        className="bg-background-sub1 w-full hover:bg-none"
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
function ReservationChangeSheet({
  notificationId,
  open,
  onChangeOpen,
  eventDateDescription,
}: ReservationChangeSheetProps) {
  const reservationChangeMutation = useMutation({
    mutationFn: processReservationChange,
  });

  const [isDeclineSheetOpen, setIsDeclineSheetOpen] = useState(false);
  const [isAcceptSheetOpen, setIsAccepSheetOpen] = useState(false);

  const handleDeclineClick = (reservationId: number, userId: number) => () => {
    reservationChangeMutation.mutate({
      requestPath: { reservationId },
      requestBody: {
        memberId: userId,
        isApprove: false,
        approveDate: DateController(new Date()).toAbsolute(),
      },
    });
    setIsDeclineSheetOpen(true);
  };
  const handleAcceptClick = (reservationId: number, userId: number) => () => {
    reservationChangeMutation.mutate({
      requestPath: {
        reservationId,
      },
      requestBody: {
        memberId: userId,
        isApprove: true,
        approveDate: DateController(new Date()).toAbsolute(),
      },
    });
    setIsAccepSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <QueryErrorBoundary fallback={SheetErrorFallback}>
            <Suspense fallback={<SheetFallback />}>
              <ReservationChangeSheetContent
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
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">회원의 예약 변경을 거절했습니다</SheetTitle>
            <SheetDescription>회원에게 예약 변경 거절 알림이 전송돼요</SheetDescription>
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
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">회원의 예약 변경을 승인했습니다</SheetTitle>
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

export default ReservationChangeSheet;

// const DUMMY_MEMBER_DETAIL = {
//   sessionInfo: {
//     sessionInfoId: 1,
//     totalCount: 2,
//     remainingCount: 1,
//   },
// };
// const DUMMY_NOTIFICATION_DETAIL = {
//   name: "홍길동",
//   birthDate: "1999-10-14",
//   phoneNumber: "01023212321",
//   profilePictureUrl: "http://123",
// };
