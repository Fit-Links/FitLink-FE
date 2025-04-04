"use client";

import React, { useState } from "react";

import { PtUser, PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

import MemberCard from "./MemberCard";
import ReservationAdderButton from "./ReservationAdderButton";
import SearchBar from "./SearchBar";
import useFilteredMembers from "../../reservation/_hooks/useFilteredMembers";

function MemberListContainer() {
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
        <MemberCard
          memberList={filteredMembers}
          selectedMemberInformation={selectedMemberInformation}
          onChangeSelectMemberInformation={handleClickSelectMember}
        />
      </section>
      <footer className="bg-background-primary h-[3.375rem] w-full">
        <ReservationAdderButton selectedMemberInformation={selectedMemberInformation} />
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
