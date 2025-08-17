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

export default MemberManagementContainer;
