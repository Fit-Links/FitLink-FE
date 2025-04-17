"use client";

import Icon from "@ui/components/Icon";
import { InputField, InputIcon, InputWithIcon } from "@ui/components/InputWithIcon";

type SearchBarProps = {
  value: string;
  onChangeValue: (value: string) => void;
};

function SearchBar({ value, onChangeValue }: SearchBarProps) {
  return (
    <InputWithIcon id="searchMember" className="box-content p-0 pb-[1.25rem]">
      <InputIcon>
        <Icon name="Search" size="md" className="text-text-sub4" />
      </InputIcon>
      <InputField value={value} onChangeValue={onChangeValue} className="h-10" />
    </InputWithIcon>
  );
}

export default SearchBar;
