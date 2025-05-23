import { useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import { Suspense, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import ProfileCard from "@trainer/components/ProfileCard";
import QueryErrorBoundary from "@trainer/components/QueryErrorBoundary";

import SheetErrorFallback from "./SheetErrorFallback";
import SheetFallback from "./SheetFallback";
import { formatSessionData } from "../../_utils/formatter";

type SessionCompleteSheetContentProps = {
  notificationId: number;
  eventDate: string;
  handleDeclineClick: () => void;
  handleAcceptClick: () => void;
};
function SessionCompleteSheetContent({
  notificationId,
  eventDate,
  handleDeclineClick,
  handleAcceptClick,
}: SessionCompleteSheetContentProps) {
  const { data } = useSuspenseQuery(notificationQueries.detail(notificationId));
  const {
    userDetail: { name, profilePictureUrl, birthDate, phoneNumber },
  } = data.data;

  const {
    sessionInfo: { remainingCount, totalCount },
  } = DUMMY_MEMBER_DETAIL;

  return (
    <>
      <SheetHeader className="items-center">
        <SheetTitle className="flex justify-center">{eventDate}</SheetTitle>
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
              onClick={handleDeclineClick}
            >
              불참석
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button size={"xl"} className="w-full" variant={"negative"} onClick={handleAcceptClick}>
              PT 완료
            </Button>
          </SheetClose>
        </div>
      </SheetFooter>
    </>
  );
}

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
  //TODO: 회원 상세 정보 조회 API 연결

  const [isDeclineSheetOpen, setIsDeclineSheetOpen] = useState(false);
  const [isAcceptSheetOpen, setIsAccepSheetOpen] = useState(false);

  const handleDeclineClick = () => {
    setIsDeclineSheetOpen(true);
  };
  const handleAcceptClick = () => {
    setIsAccepSheetOpen(true);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onChangeOpen}>
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
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
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
          <SheetHeader className="items-center">
            <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
              <Icon name="Check" size="lg" />
            </Button>
            <SheetTitle className="text-center">수업을 불참석 처리했습니다</SheetTitle>
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
            <SheetTitle className="text-center">수업을 완료 처리했습니다</SheetTitle>
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

const DUMMY_MEMBER_DETAIL = {
  sessionInfo: {
    sessionInfoId: 1,
    totalCount: 2,
    remainingCount: 1,
  },
};
// const DUMMY_NOTIFICATION_DETAIL = {
//   name: "홍길동",
//   birthDate: "1999-10-14",
//   phoneNumber: "01023212321",
//   profilePictureUrl: "http://123",
// };
