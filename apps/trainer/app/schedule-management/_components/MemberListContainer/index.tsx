"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import React, { ReactNode, useRef, useState } from "react";

import { userManagementQueries } from "@trainer/queries/userManagement";

import { PtUser } from "@trainer/services/types/userManagement.dto";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import MemberCardList from "./MemberCardList";
import SearchBar from "./SearchBar";
import useFilteredMembers from "../../reservation/_hooks/useFilteredMembers";

type MemberListContainerProps = {
  renderFooterReservationButton: ({
    selectedMemberInformation,
  }: {
    selectedMemberInformation: PtUser | null;
  }) => ReactNode;
};

function MemberListContainer({ renderFooterReservationButton }: MemberListContainerProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedMemberInformation, setSelectedMemberInformation] = useState<PtUser | null>(null);

  const intersectionRef = useRef(null);

  const {
    data: userList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(userManagementQueries.list());

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect,
  });

  const handleClickSelectMember = (selectedMemberInformation: PtUser | null) => {
    const selectedMemberId = selectedMemberInformation?.memberId;
    const selectedMember = userList.pages[0].data.content.find(
      ({ memberId }) => memberId === selectedMemberId,
    );

    setSelectedMemberInformation((prev) => {
      if (!selectedMember) return null;
      if (prev) {
        return prev.memberId === selectedMember.memberId ? null : selectedMember;
      }

      return selectedMember;
    });
  };

  const filteredMembers = useFilteredMembers(
    userList.pages.flatMap((page) => page.data.content),
    inputValue,
  );

  return (
    <>
      <section className="flex h-full w-full flex-col overflow-hidden pb-5 pt-[1.688rem]">
        <SearchBar value={inputValue} onChangeValue={setInputValue} />
        <section className="relative h-full overflow-hidden">
          <div className="bg-background-primary absolute top-0 z-10 box-content flex h-7 w-full justify-between">
            <div>회원 {filteredMembers.length}명</div>
            <div>최신 등록순</div>
          </div>
          <MemberCardList
            ref={intersectionRef}
            memberList={filteredMembers}
            selectedMemberInformation={selectedMemberInformation}
            onChangeSelectMemberInformation={handleClickSelectMember}
          />
        </section>
      </section>
      <footer className="bg-background-primary mb-2 h-[3.375rem] w-full">
        {renderFooterReservationButton({ selectedMemberInformation })}
      </footer>
    </>
  );
}

export default MemberListContainer;
