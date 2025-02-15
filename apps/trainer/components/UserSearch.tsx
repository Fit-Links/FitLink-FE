import { InputField, InputIcon, InputWithIcon } from "@ui/components/InputWithIcon";
import { cn } from "@ui/lib/utils";
import { Search } from "lucide-react";
import React, { ComponentProps } from "react";

type UserSearchProps = ComponentProps<"div">;

function UserSearch({ className, ...props }: UserSearchProps) {
  return (
    <div className={cn("flex h-full w-full flex-col", className)} {...props}>
      {props.children}
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

type SearchResultModeProps = ComponentProps<"div">;

function SearchResultHeader({ className, ...props }: SearchResultModeProps) {
  return (
    <div
      className={cn(
        "text-body-3 text-text-primary mt-[1.25rem] flex h-fit items-center justify-between",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

type SearchResultProps = ComponentProps<"div">;

function SearchResult({ className, ...props }: SearchResultProps) {
  return (
    <div
      className={cn(
        "text-text-primary text-body-3 mt-[0.625rem] flex w-full flex-col gap-[0.625rem]",
        className,
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}

export { UserSearch, SearchBar, SearchResultHeader, SearchResult };
