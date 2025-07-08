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
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { Suspense, useState } from "react";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";
import { userManagementQueries } from "@trainer/queries/userManagement";

import { createCompletedPt } from "@trainer/services/reservations";

import ProfileCard from "@trainer/components/ProfileCard";
import QueryErrorBoundary from "@trainer/components/QueryErrorBoundary";

import SheetErrorFallback from "./SheetErrorFallback";
import SheetFallback from "./SheetFallback";
import { formatSessionData } from "../../_utils/formatter";

type SessionCompleteSheetContentProps = {
  notificationId: number;
  eventDate: string;
  handleDeclineClick: (reservationId: number, userId: number) => () => void;
  handleAcceptClick: (reservationId: number, userId: number) => () => void;
};
function SessionCompleteSheetContent({
  notificationId,
  eventDate,
  handleDeclineClick,
  handleAcceptClick,
}: SessionCompleteSheetContentProps) {
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
        <SheetTitle className="flex justify-center">{eventDate}</SheetTitle>
        <VisuallyHidden>
          <SheetDescription>이 시트에서 PT 수업의 참석 여부를 처리할 수 있습니다</SheetDescription>
        </VisuallyHidden>
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
              불참석
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              size={"xl"}
              className="w-full"
              variant={"negative"}
              onClick={handleAcceptClick(refId, userId)}
            >
              PT 완료
            </Button>
          </SheetClose>
        </div>
      </SheetFooter>
    </>
  );
}

type ReservationCompletionMutationParams = {
  memberId: number;
  reservationId: number;
  isJoin: boolean;
};

type SessionCompleteSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  eventDate: string;
};
function SessionCompleteSheet({
  open,
  onChangeOpen,
  eventDate,
  notificationId,
}: SessionCompleteSheetProps) {
  const queryClient = useQueryClient();

  const sessionMutation = useMutation({
    mutationFn: ({ memberId, reservationId, isJoin }: ReservationCompletionMutationParams) =>
      createCompletedPt({ reservationId }, { memberId, isJoin }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() });
    },
  });

  const [isDeclineSheetOpen, setIsDeclineSheetOpen] = useState(false);
  const [isAcceptSheetOpen, setIsAccepSheetOpen] = useState(false);

  const handleDeclineClick = (reservationId: number, userId: number) => () => {
    sessionMutation.mutate({ memberId: userId, reservationId, isJoin: false });
    setIsDeclineSheetOpen(true);
  };
  const handleAcceptClick = (reservationId: number, userId: number) => () => {
    sessionMutation.mutate({ memberId: userId, reservationId, isJoin: true });
    setIsAccepSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <QueryErrorBoundary fallback={SheetErrorFallback}>
            <Suspense fallback={<SheetFallback />}>
              <SessionCompleteSheetContent
                notificationId={notificationId}
                eventDate={eventDate}
                handleAcceptClick={handleAcceptClick}
                handleDeclineClick={handleDeclineClick}
              />
            </Suspense>
          </QueryErrorBoundary>
        </SheetContent>
      </Sheet>
      <Sheet open={isDeclineSheetOpen} onOpenChange={setIsDeclineSheetOpen}>
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">수업을 불참석 처리했습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트에서 PT 수업 불참석 처리가 완료되었음을 알려줍니다
              </SheetDescription>
            </VisuallyHidden>
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
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">수업을 완료 처리했습니다</SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                이 시트에서 PT 수업 완료 처리가 완료되었음을 알려줍니다
              </SheetDescription>
            </VisuallyHidden>
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

export default SessionCompleteSheet;
