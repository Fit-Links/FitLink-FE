"use client";

import React, { ReactNode, useState } from "react";

import { PtUser, PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

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

  const handleClickSelectMember = (selectedMemberInformation: PtUser | null) => {
    const selectedMemberId = selectedMemberInformation?.memberId;
    const selectedMember = MOCK_MEMBERINFOS.content.find(
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

  const filteredMembers = useFilteredMembers(MOCK_MEMBERINFOS.content, inputValue);

  return (
    <>
      <section className="flex h-full w-full flex-col overflow-hidden pb-3 pt-[1.688rem]">
        <SearchBar value={inputValue} onChangeValue={setInputValue} />
        <section className="relative h-full overflow-hidden">
          <div className="bg-background-primary absolute top-0 z-10 box-content flex h-7 w-full justify-between">
            <div>회원 {filteredMembers.length}명</div>
            <div>최신 등록순</div>
          </div>
          <MemberCardList
            memberList={filteredMembers}
            selectedMemberInformation={selectedMemberInformation}
            onChangeSelectMemberInformation={handleClickSelectMember}
          />
        </section>
      </section>
      <footer className="bg-background-primary h-[3.375rem] w-full">
        {renderFooterReservationButton({ selectedMemberInformation })}
      </footer>
    </>
  );
}

export default MemberListContainer;

const MOCK_MEMBERINFOS: PtUserListApiResponse["data"] = {
  content: [
    {
      memberId: 1,
      name: "홍길동",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 2,
      name: "하정우",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "이병헌",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "신세경",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "지창욱",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "차은우",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "유아인",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "권지용",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "최익",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 1,
      name: "최승현",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
    {
      memberId: 2,
      name: "박효신",
      birthDate: "2002-01-12",
      phoneNumber: "01028321232",
      profilePictureUrl: "",
      sessionInfo: {
        sessionInfoId: 1,
        totalCount: 1,
        remainingCount: 2,
      },
    },
  ],
  totalElements: "3",
  totalPages: "5",
};
