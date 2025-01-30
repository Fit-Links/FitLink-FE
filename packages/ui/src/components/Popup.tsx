"use client";

import { Portal } from "@radix-ui/react-portal";
import React, { forwardRef } from "react";

import { cn } from "../lib/utils";

type PopupProps = {
  open?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  ({ children, className, open = false, ...props }, ref) => {
    if (open)
      return (
        <div ref={ref} className={cn(className)} {...props}>
          {children}
        </div>
      );
  },
);
Popup.displayName = "Popup";

const PopupPortal = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    container?: Element | DocumentFragment | null;
  }
>(({ children, container }, ref) => {
  return (
    <Portal ref={ref} container={container}>
      {children}
    </Portal>
  );
});
PopupPortal.displayName = "PopupPortal";

type PopupContentProps = {
  container?: Element | DocumentFragment | null;
} & React.ComponentPropsWithoutRef<"div">;

const PopupContent = forwardRef<HTMLDivElement, PopupContentProps>(
  ({ children, container }, ref) => (
    <PopupPortal ref={ref} container={container}>
      <PopupOverlay>
        <PopupContainer>{children}</PopupContainer>
      </PopupOverlay>
    </PopupPortal>
  ),
);
PopupContent.displayName = "PopupContent";

const PopupOverlay = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-text-primary fixed inset-0 left-0 top-0 z-50 flex h-auto w-auto items-center justify-center bg-black/75",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopupOverlay.displayName = "PopupOverlay";

const PopupContainer = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-background-sub2 text-text-primary flex min-h-[11.25rem] min-w-[18.25rem] flex-col items-center rounded-[1.25rem] px-[1.563rem] py-[1.875rem] shadow-md",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopupContainer.displayName = "PopupContainer";

const PopupTitle = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-text-primary text-center text-[1.063rem]", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopupTitle.displayName = "PopupTitle";

const PopupDescription = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-text-sub2 mt-[0.5rem] text-center text-[0.813rem]", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopupDescription.displayName = "PopupDescription";

const PopupButtonGroup = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mt-[1.875rem] flex items-center justify-center gap-[0.625rem]", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopupButtonGroup.displayName = "PopupButtonGroup";

export { Popup, PopupContent, PopupTitle, PopupDescription, PopupButtonGroup };
