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
import { useState } from "react";

import ProfileCard from "@trainer/components/ProfileCard";

import { formatSessionData } from "../../_utils/formatter";

type SessionCompleteSheetProps = {
  notificationId: number;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  eventDate: string;
};
function SessionCompleteSheet({ open, onChangeOpen, eventDate }: SessionCompleteSheetProps) {
  //TODO: 알림 상세 내역 조회 API 연결
  //TODO: 회원 상세 정보 조회 API 연결
  const { name, phoneNumber, profilePictureUrl, birthDate } = DUMMY_NOTIFICATION_DETAIL;
  const {
    sessionInfo: { remainingCount, totalCount },
  } = DUMMY_MEMBER_DETAIL;

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
                <Button
                  size={"xl"}
                  className="w-full"
                  variant={"negative"}
                  onClick={handleAcceptClick}
                >
                  PT 완료
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
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
const DUMMY_NOTIFICATION_DETAIL = {
  name: "홍길동",
  birthDate: "1999-10-14",
  phoneNumber: "01023212321",
  profilePictureUrl: "http://123",
};
