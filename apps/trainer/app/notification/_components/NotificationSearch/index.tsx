"use client";

import { Dialog, DialogContent, DialogTrigger } from "@5unwan/ui/components/Dialog";
import Header from "@5unwan/ui/components/Header";
import { InputIcon, InputWithIcon } from "@5unwan/ui/components/InputWithIcon/index";
import { Badge } from "@ui/components/Badge";
import { InputField } from "@ui/components/InputWithIcon";
import { Search } from "lucide-react";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";

import ProfileCard from "@trainer/components/ProfileCard";

import MemberNotificationResult from "./MemberNotificationResult";
import { formatSessionData } from "../../_utils/formatter";

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
                      {formatSessionData(remainingCount, totalCount)}
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
