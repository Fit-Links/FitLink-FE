"use client";

import { ChevronLeft } from "lucide-react";
import { MouseEventHandler, ReactNode, useCallback } from "react";

import { cn } from "@ui/lib/utils";

import Icon from "./Icon";
import { Text } from "./Text";

type HeaderRootProps = {
  logo?: ReactNode;
  children?: ReactNode;
  subHeader?: ReactNode;
  className?: string;
};

const GUIDE_URL =
  "https://www.notion.so/Fit-Link-245764b4d45580da9230e07a9e3b374e?source=copy_link";

function HeaderRoot({ logo, subHeader, children, className }: HeaderRootProps) {
  const hasChildren = Array.isArray(children) ? children.some((child) => !!child) : children;

  const handleClickOpenInformation = () => {
    if (typeof window !== "undefined") {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        window.open(GUIDE_URL, "_blank", "noopener,noreferrer");
      } else {
        window.open(GUIDE_URL, "_blank");
      }
    }
  };

  const handleClickLogo = useCallback(() => {
    window.location.href = `${window.location.origin}/schedule-management`;
  }, []);

  return (
    <>
      <section className="w-full">
        <header className={cn("bg-background-primary z-10 w-full")}>
          {logo && (
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-[3rem] cursor-pointer items-center justify-start transition-transform",
                )}
                onClick={handleClickLogo}
              >
                {logo}
              </div>
              <Icon
                name="Info"
                size="lg"
                className="cursor-pointer"
                onClick={handleClickOpenInformation}
              />
            </div>
          )}
        </header>
      </section>
      {hasChildren && (
        <section className="text-text-primary text-title-2 bg-background-primary sticky top-0 z-10 flex flex-col gap-2">
          <div className={cn("grid h-[2.1875rem] grid-cols-3 items-center", className)}>
            {children}
          </div>
          {subHeader && <div>{subHeader}</div>}
        </section>
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
