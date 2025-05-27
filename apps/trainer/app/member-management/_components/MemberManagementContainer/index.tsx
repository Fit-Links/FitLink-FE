"use client";

import { API_DEBOUNCE_LIMIT } from "@5unwan/core/utils/debounce";
import { useState } from "react";

import useDebounce from "@trainer/hooks/useDebounce";

import MemberProfileList from "./MemberProfileList";
import SearchBar from "./SearchBar";

function MemberManagementContainer() {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearch = useDebounce(inputValue, API_DEBOUNCE_LIMIT);

  return (
    <section className="flex h-full flex-col overflow-hidden pt-3">
      <SearchBar value={inputValue} onChangeValue={setInputValue} />
      <MemberProfileList searchValue={debouncedSearch} />
    </section>
  );
}

// const MOCK_MEMBERINFOS: PtUserListApiResponse["data"] = {
//   content: [
//     {
//       memberId: 1,
//       name: "홍길동",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 2,
//       name: "하정우",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "이병헌",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "신세경",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "지창욱",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "차은우",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "유아인",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "권지용",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "최익",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 1,
//       name: "최승현",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//     {
//       memberId: 2,
//       name: "박효신",
//       birthDate: "2002-01-12",
//       phoneNumber: "01028321232",
//       profilePictureUrl: "",
//       sessionInfo: {
//         sessionInfoId: 1,
//         totalCount: 1,
//         remainingCount: 2,
//       },
//     },
//   ],
//   totalElements: "3",
//   totalPages: "5",
// };

export default MemberManagementContainer;
