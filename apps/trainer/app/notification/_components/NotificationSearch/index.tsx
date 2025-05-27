"use client";

import { API_DEBOUNCE_LIMIT } from "@5unwan/core/utils/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import { Dialog, DialogContent, DialogTrigger } from "@ui/components/Dialog";
import Header from "@ui/components/Header";
import { InputField } from "@ui/components/InputWithIcon";
import { InputIcon, InputWithIcon } from "@ui/components/InputWithIcon/index";
import { Search } from "lucide-react";
import { Dispatch, MouseEventHandler, SetStateAction, useRef, useState, Fragment } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import ProfileCard from "@trainer/components/ProfileCard";

import useDebounce from "@trainer/hooks/useDebounce";
import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import MemberNotificationResult from "./MemberNotificationResult";
import EmptySearchResult from "../../../../components/EmptySearchResult";
import { formatSessionData } from "../../_utils/formatter";
import ProfileCardListFallback from "../ProfileCardListFallback";

type NotificationSearchContentProps = {
  search?: string;
  onProfileClick: (id: number) => MouseEventHandler<HTMLElement>;
};
function NotificationSearchContent({ search, onProfileClick }: NotificationSearchContentProps) {
  const intersectionRef = useRef(null);

  // queryOptions의 enabled 활용을 위해 useSuspenseInfiniteQuery가 아닌 useInfiniteQuery 사용
  const { isLoading, data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(userManagementQueries.list(search));

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  if (isLoading) {
    return <ProfileCardListFallback />;
  }
  if (status === "pending") {
    return <></>;
  }
  if (status === "error") {
    return "error";
  }

  return (
    <ul className="flex flex-1 flex-col gap-3">
      {data.pages[0].data.totalElements ? (
        data.pages.map((group, index) => (
          <Fragment key={`search-notificationMemberGroup-${index}`}>
            {group.data.content.map(
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
                  onClick={onProfileClick(memberId)}
                  key={`search-notificationMember-${memberId}`}
                >
                  <Badge size="sm" variant="sub2">
                    {formatSessionData(remainingCount, totalCount)}
                  </Badge>
                </ProfileCard>
              ),
            )}
          </Fragment>
        ))
      ) : (
        <EmptySearchResult />
      )}
      <div ref={intersectionRef} />
    </ul>
  );
}

type NotificationSearchProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSelectResult: () => void;
};
function NotificationSearch({ isOpen, setIsOpen }: NotificationSearchProps) {
  const [search, setSearch] = useState<string | undefined>();
  const [selected, setSelected] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, API_DEBOUNCE_LIMIT);

  const handleProfileCardClick: (id: number) => MouseEventHandler<HTMLElement> = (id) => () => {
    setSelected(id);
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
            <InputWithIcon id="notification-search" className="mb-4">
              <InputIcon>
                <Search size={20} color="gray" />
              </InputIcon>
              <InputField className="h-[2.5rem]" value={search} onChangeValue={setSearch} />
            </InputWithIcon>

            <NotificationSearchContent
              search={debouncedSearch}
              onProfileClick={handleProfileCardClick}
            />
          </>
        )}
        {selected !== null && <MemberNotificationResult memberId={selected} />}
      </DialogContent>
    </Dialog>
  );
}

export default NotificationSearch;

// const DUMMY_MEMBER = [
//   {
//     memberId: 1,
//     name: "홍길동",
//     birthDate: "2002-01-12",
//     phoneNumber: "01028321232",
//     profilePictureUrl: "https://picsum.photos/200",
//     sessionInfo: {
//       sessionInfoId: 1,
//       totalCount: 2,
//       remainingCount: 1,
//     },
//   },
//   {
//     memberId: 2,
//     name: "홍길동",
//     birthDate: "2002-01-12",
//     phoneNumber: "01028321232",
//     profilePictureUrl: "https://picsum.photos/200",
//     sessionInfo: {
//       sessionInfoId: 1,
//       totalCount: 2,
//       remainingCount: 1,
//     },
//   },
// ];
