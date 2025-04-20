"use client";

import { useState } from "react";

import { PtUserListApiResponse } from "@trainer/services/types/userManagement.dto";

import MemberProfileList from "./MemberProfileList";
import SearchBar from "./SearchBar";
import useFilteredMembers from "../../_hooks/useFilteredMembers";

function MemberManagementContainer() {
  const [inputValue, setInputValue] = useState("");

  const filteredMembers = useFilteredMembers(MOCK_MEMBERINFOS.content, inputValue);

  return (
    <section className="flex h-full flex-col overflow-hidden pt-3">
      <SearchBar value={inputValue} onChangeValue={setInputValue} />
      <MemberProfileList memberInformations={filteredMembers} />
    </section>
  );
}

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

export default MemberManagementContainer;
