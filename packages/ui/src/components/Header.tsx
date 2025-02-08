import { ChevronLeft } from "lucide-react";
import React, { MouseEventHandler } from "react";

import { cn } from "@ui/lib/utils";

import { Text } from "./Text";

type HeaderRootProps = {
  children: React.ReactNode;
  className?: string;
};
function HeaderRoot({ children, className }: HeaderRootProps) {
  return (
    <div
      className={cn(
        "text-text-primary text-title-2 grid w-full grid-cols-3 items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

type HeaderSectionProps = {
  position: "left" | "right";
  children: React.ReactNode;
  className?: string;
};
function HeaderSection({ position, children, className }: HeaderSectionProps) {
  return (
    <div
      className={cn(
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
