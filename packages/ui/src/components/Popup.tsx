"use client";

import React, { forwardRef } from "react";

import { cn } from "../lib/utils";

const Popup = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "text-text-primary fixed inset-0 left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/75",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Popup.displayName = "Popup";

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

export { Popup, PopupContainer, PopupTitle, PopupDescription, PopupButtonGroup };
