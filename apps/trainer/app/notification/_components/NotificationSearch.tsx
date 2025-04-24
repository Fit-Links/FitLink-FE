"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { Dialog, DialogContent, DialogTrigger } from "@5unwan/ui/components/Dialog";
import Header from "@5unwan/ui/components/Header";
import { InputIcon, InputWithIcon } from "@5unwan/ui/components/InputWithIcon/index";
import { Badge } from "@ui/components/Badge";
import { InputField } from "@ui/components/InputWithIcon";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Search } from "lucide-react";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

import ProfileCard from "@trainer/components/ProfileCard";

import NotificationItemContainer from "./NotificationItemContainer";
import SheetRenderer from "./SheetRenderer";
import { parseEventDateFromContent } from "../_utils/parser";

const PAD_LENGTH = 2;
const PAD_STRING = "0";

type NotificationSearchProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSelectResult: () => void;
};
function NotificationSearch({ isOpen, setIsOpen }: NotificationSearchProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const handleProfileCardClick: (name: string) => MouseEventHandler<HTMLElement> = (name) => () => {
    setSelected(name);
  };
  const handleClickHeaderBack = () => {
    if (selected) {
      setSelected(null);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Search color="white" />
      </DialogTrigger>
      <DialogContent className="bg-background-primary flex h-full w-full flex-col rounded-none">
        <Header className="mb-4">
          <Header.Back onClick={handleClickHeaderBack} />
          <Header.Title content="알림 검색" />
        </Header>
        {selected === null && (
          <>
            <InputWithIcon id="notification-search">
              <InputIcon>
                <Search size={20} color="gray" />
              </InputIcon>
              <InputField className="h-[2.5rem]" value={search} onChangeValue={setSearch} />
            </InputWithIcon>
            <ul className="flex flex-col gap-3">
              {DUMMY_MEMBER.map(
                ({
                  name,
                  memberId,
                  birthDate,
                  phoneNumber,
                  profilePictureUrl,
                  sessionInfo: { totalCount, remainingCount },
                }) => (
                  <ProfileCard
                    userName={name}
                    imgUrl={profilePictureUrl}
                    userBirth={new Date(birthDate)}
                    phoneNumber={phoneNumber}
                    className="w-full"
                    onClick={handleProfileCardClick(name)}
                    key={`member-${memberId}`}
                  >
                    <Badge size="sm" variant="sub2">
                      {String(remainingCount).padStart(PAD_LENGTH, PAD_STRING)}/
                      {String(totalCount).padStart(PAD_LENGTH, PAD_STRING)}
                    </Badge>
                  </ProfileCard>
                ),
              )}
            </ul>
          </>
        )}
        {selected !== null && <MemberNotificationResult />}
      </DialogContent>
    </Dialog>
  );
}

export default NotificationSearch;

function MemberNotificationResult() {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed } = notification;
    if (notificationId !== selectedNotification?.notificationId) {
      setSelectedNotification({
        notificationId,
        type,
        content,
        sendDate,
        isProcessed,
      });
    }

    setIsActionSheetOpen(true);
  };

  const ActionSheet =
    selectedNotification && selectedNotification.type && SheetRenderer[selectedNotification.type];

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <ToggleGroup type="single" value={category} onValueChange={setCategory}>
          <ToggleGroupItem value={"all"} className="flex-shrink-0">
            전체
          </ToggleGroupItem>
          <ToggleGroupItem value="connect" className="flex-shrink-0">
            트레이너 연동
          </ToggleGroupItem>
          <ToggleGroupItem value="disconnect" className="flex-shrink-0">
            트레이너 연동 해제
          </ToggleGroupItem>
          <ToggleGroupItem value="reservation-request" className="flex-shrink-0">
            예약 요청
          </ToggleGroupItem>
          <ToggleGroupItem value="reservation-change-cancel" className="flex-shrink-0">
            예약 변경/취소
          </ToggleGroupItem>
          <ToggleGroupItem value="session" className="flex-shrink-0">
            세션
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup type="single" value={status} onValueChange={setStatus}>
          <ToggleGroupItem value="all">전체</ToggleGroupItem>
          <ToggleGroupItem value="pending">미처리</ToggleGroupItem>
          <ToggleGroupItem value="complete">처리</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ul>
        {DUMMY_NOTIFICATION.map((notification) => (
          <NotificationItemContainer
            notification={notification as NotificationInfo}
            onClick={handleNotificationClick(notification as NotificationInfo)}
          />
        ))}
      </ul>

      {ActionSheet &&
        ActionSheet(
          {
            notificationId: selectedNotification.notificationId,
            open: isActionSheetOpen,
            onChangeOpen: setIsActionSheetOpen,
          },
          parseEventDateFromContent(selectedNotification.content),
        )}
    </>
  );
}

const DUMMY_MEMBER = [
  {
    memberId: 1,
    name: "홍길동",
    birthDate: "2002-01-12",
    phoneNumber: "01028321232",
    profilePictureUrl: "https://picsum.photos/200",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 2,
      remainingCount: 1,
    },
  },
  {
    memberId: 2,
    name: "홍길동",
    birthDate: "2002-01-12",
    phoneNumber: "01028321232",
    profilePictureUrl: "https://picsum.photos/200",
    sessionInfo: {
      sessionInfoId: 1,
      totalCount: 2,
      remainingCount: 1,
    },
  },
];

const DUMMY_NOTIFICATION = [
  {
    notificationId: 1,
    type: "예약 요청",
    content: "홍길동 회원님이 PT 예약을 요청하였습니다.\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-09T17:25:15.879023",
    isProcessed: false,
  },
  {
    notificationId: 2,
    type: "예약 변경",
    content:
      "길동 회원님의 PT 예약 변경이 요청되었습니다.\n날짜: 04.21 (월) 오후 5시 -> 04.22 (화) 오후 5시",
    sendDate: "2025-04-08T17:25:15.881664",
    isProcessed: false,
  },
  {
    notificationId: 3,
    type: "예약 취소",
    content: "홍길동 회원이 PT 예약 취소를 요청했습니다\n날짜: 1.1 (월) 오후 12시",
    sendDate: "2025-04-07T17:25:15.882358",
    isProcessed: false,
  },
  {
    notificationId: 4,
    type: "연동 승인",
    content: "홍길동 회원이 연동 승인을 요청했습니다",
    sendDate: "2025-04-06T17:25:15.882954",
    isProcessed: false,
  },
  {
    notificationId: 5,
    type: "연동 해제",
    content: "홍길동 회원이 연동을 해제했습니다",
    sendDate: "2025-04-05T17:25:15.883592",
    isProcessed: false,
  },
  {
    notificationId: 6,
    type: "세션",
    content: "홍길동 회원의 PT가 종료되었습니다\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-04T17:25:15.884254",
    isProcessed: false,
  },
];
