import { Input } from "@ui/components/Input";
import { cn } from "@ui/lib/utils";
import { Search } from "lucide-react";
import React, { ComponentProps } from "react";

type SearchBarProps = {
  placeholder: string;
  onChange: (value: string) => void;
} & ComponentProps<"div">;

function SearchBar({ children, placeholder, className, onChange, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div className="absolute left-0 top-0 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
        <Search className="text-text-sub4 h-[1.563rem] w-[1.563rem]" />
      </div>
      <Input
        className="bg-background-sub2 h-[2.5rem] w-full pl-[2.5rem] leading-[0.938rem]"
        placeholder={placeholder}
        onChange={onChange}
      />
      {children}
    </div>
  );
}

type SearchModeProps = ComponentProps<"div">;

function SearchMode({ children, className, ...props }: SearchModeProps) {
  return (
    <div
      className={cn(
        "text-text-primary text-body-3 mt-[1.25rem] flex w-full justify-between",
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

export { SearchBar, SearchMode, SearchResult };
