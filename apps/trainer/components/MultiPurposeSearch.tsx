import { InputField, InputIcon, InputWithIcon } from "@ui/components/InputWithIcon";
import { cn } from "@ui/lib/utils";
import { Search } from "lucide-react";
import React, { ComponentProps } from "react";

type MultiPurposeSearchProps = {
  children: React.ReactNode;
} & ComponentProps<"div">;

function MultiPurposeSearch({ children, className, ...props }: MultiPurposeSearchProps) {
  return (
    <div className={cn("flex h-full w-full flex-col", className)} {...props}>
      {children}
    </div>
  );
}

type SearchBarProps = {
  placeholder: string;
  value: string | number;
  onChangeValue: (value: string | number) => void;
} & ComponentProps<"div">;

function SearchBar({ placeholder, value, onChangeValue }: SearchBarProps) {
  return (
    <InputWithIcon id="search-bar">
      <InputIcon>
        <Search className="text-text-sub4" />
      </InputIcon>
      <InputField
        className="caret-brand-primary-500"
        placeholder={placeholder}
        value={value}
        onChangeValue={onChangeValue}
      />
    </InputWithIcon>
  );
}

type SearchResultProps = {
  label: string;
  sortComponent?: React.ReactNode;
} & ComponentProps<"div">;

function SearchResult({ label, sortComponent, children, className, ...props }: SearchResultProps) {
  return (
    <div
      className={cn("text-text-primary text-body-3 flex w-full flex-col gap-[0.625rem]", className)}
      {...props}
    >
      <div className="mt-[1.25rem] flex items-center justify-between">
        <p className="text-text-primary text-body-3">{label}</p>
        {sortComponent}
      </div>
      <div className="flex h-full w-full flex-col gap-[0.625rem]">{children}</div>
    </div>
  );
}

export { MultiPurposeSearch, SearchBar, SearchResult };
