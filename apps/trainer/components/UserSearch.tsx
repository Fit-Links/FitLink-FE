import { InputField, InputIcon, InputWithIcon } from "@ui/components/InputWithIcon";
import { cn } from "@ui/lib/utils";
import { Search } from "lucide-react";
import React, { ComponentProps } from "react";

type UserSearchProps = {
  children: React.ReactNode;
} & ComponentProps<"div">;

function UserSearch({ children, className, ...props }: UserSearchProps) {
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

type SearchResultModeProps = ComponentProps<"div">;

function SearchResultMode({ children, className, ...props }: SearchResultModeProps) {
  return (
    <div
      className={cn(
        "text-body-3 text-text-primary mt-[1.25rem] flex h-fit items-center justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SearchResultProps = ComponentProps<"div">;

function SearchResult({ children, className, ...props }: SearchResultProps) {
  return (
    <div
      className={cn(
        "text-text-primary text-body-3 mt-[0.625rem] flex w-full flex-col gap-[0.625rem]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { UserSearch, SearchBar, SearchResultMode, SearchResult };
