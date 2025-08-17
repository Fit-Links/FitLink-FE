"use client";

import { API_DEBOUNCE_LIMIT } from "@5unwan/core/utils/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Badge } from "@ui/components/Badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/Dialog";
import Header from "@ui/components/Header";
import { InputField } from "@ui/components/InputWithIcon";
import { InputIcon, InputWithIcon } from "@ui/components/InputWithIcon/index";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { Search } from "lucide-react";
import { MouseEventHandler, useRef, useState, Fragment } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import Logo from "@trainer/components/Logo";
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
    <ul className="flex flex-1 flex-col gap-3 overflow-auto">
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

type NotificationSearchSubHeaderProps = {
  selected: number | null;
};
const NotificationSearchSubHeader = ({ selected }: NotificationSearchSubHeaderProps) => (
  <p className="text-body-1 text-text-sub2 text-center">
    {selected === null ? "회원을 검색해주세요" : `회원 알림 검색`}
  </p>
);

function NotificationSearch() {
  const [search, setSearch] = useState<string | undefined>();
  const [selected, setSelected] = useState<number | null>(null);

  const debouncedSearch = useDebounce(search, API_DEBOUNCE_LIMIT);

  const handleProfileCardClick: (id: number) => MouseEventHandler<HTMLElement> = (id) => () => {
    setSelected(id);
  };
  const handleClickHeaderBack = () => {
    if (selected) {
      setSelected(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Search color="white" />
      </DialogTrigger>
      <DialogContent className="bg-background-primary md:w-mobile md:data-[state=closed]:slide-out-to-left-[calc((100%-30rem)/2)] md:data-[state=closed]:slide-out-to-top-[calc((100%-30rem)/2)] md:data-[state=open]:slide-in-from-left-[calc((100%-30rem)/2)] md:data-[state=open]:slide-in-from-top-[calc((100%-30rem)/2)] flex h-full w-full flex-col rounded-none py-0 md:inset-x-[calc((100%-30rem)/2)] md:top-0 md:translate-x-0 md:translate-y-0">
        <VisuallyHidden>
          <DialogTitle>알림 검색</DialogTitle>
          <DialogDescription>
            이 모달은 트레이너와 연동된 회원을 검색하고, 검색한 회원의 알림을 한눈에 확인할 수
            있도록 도와줍니다
          </DialogDescription>
        </VisuallyHidden>
        <Header logo={<Logo />} subHeader={<NotificationSearchSubHeader selected={selected} />}>
          {selected === null && (
            <DialogClose>
              <Header.Back onClick={() => {}} />
            </DialogClose>
          )}
          {selected !== null && <Header.Back onClick={handleClickHeaderBack} />}
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
