"use client";

import { ChevronLeft } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";

import { cn } from "@ui/lib/utils";

import { Text } from "./Text";

type HeaderRootProps = {
  logo?: ReactNode;
  children?: ReactNode;
  subHeader?: ReactNode;
  className?: string;
};
function HeaderRoot({ logo, subHeader, children, className }: HeaderRootProps) {
  const hasChildren = Array.isArray(children) ? children.some((child) => !!child) : children;

  return (
    <>
      <header className={cn("bg-background-primary z-10 w-full")}>
        {logo && (
          <div
            className={cn(
              "border-background-sub2 flex h-[3rem] items-center justify-start transition-transform",
            )}
          >
            {logo}
          </div>
        )}
      </header>
      {hasChildren && (
        <div className="text-text-primary text-title-2 bg-background-primary sticky top-0 z-10 ">
          <div className={cn("grid h-[2.1875rem] grid-cols-3 items-center", className)}>
            {children}
          </div>
          {subHeader && <div>{subHeader}</div>}
        </div>
      )}
    </>
  );
}

type HeaderSectionProps = {
  position: "left" | "right";
  children?: React.ReactNode;
  className?: string;
};
function HeaderSection({ position, children, className }: HeaderSectionProps) {
  return (
    <div
      className={cn(
        "sticky top-0 cursor-pointer",
        {
          "col-start-1 col-end-2 justify-self-start": position === "left",
          "col-start-3 col-end-4 justify-self-end": position === "right",
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

type HeaderTitleProps = {
  content: string;
  className?: string;
};
function HeaderTitle({ content, className }: HeaderTitleProps) {
  return (
    <Text.Title2 className={cn("col-start-2 col-end-3 justify-self-center", className)}>
      {content}
    </Text.Title2>
  );
}

type HeaderBackProps = { onClick: MouseEventHandler };
function HeaderBack({ onClick }: HeaderBackProps) {
  return (
    <HeaderSection position="left">
      <ChevronLeft size={25} onClick={onClick} className="cursor-pointer" />
    </HeaderSection>
  );
}

const HeaderSectionPicker = (position: "left" | "right") =>
  function HeaderSectionMaker(props: Omit<HeaderSectionProps, "position">) {
    return <HeaderSection position={position} {...props}></HeaderSection>;
  };

const Header = Object.assign(HeaderRoot, {
  Back: HeaderBack,
  Left: HeaderSectionPicker("left"),
  Right: HeaderSectionPicker("right"),
  Title: HeaderTitle,
});
export default Header;
