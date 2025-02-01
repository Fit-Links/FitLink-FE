import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "bg-background-sub2 relative flex min-h-[90px] min-w-[358px] flex-col justify-center overflow-hidden rounded-xl ",
  {
    variants: {
      variant: {
        hover: "hover:bg-background-sub3",
        focused: "focus:outline-brand-primary-500 focus:outline focus:outline-[1.5px]",
      },
    },
    defaultVariants: {
      variant: "hover",
    },
  },
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "hover" | "focused" }
>(({ className, variant, ...props }, ref) => (
  <div
    tabIndex={0}
    ref={ref}
    className={cn(badgeVariants({ variant: variant }), className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardSeperate = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("felx-col flex", className)} {...props} />
  ),
);
CardSeperate.displayName = "CardSeperate";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex min-w-[80px] items-center justify-center", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-text-primary flex flex-col justify-center text-[17px]", className)}
      {...props}
    />
  ),
);

CardContent.displayName = "CardDescription";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-text-primary flex flex-grow-[1] flex-col items-end justify-center  text-[12px]",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

const CardOption = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-text-primary absolute right-[10px] top-[0px] flex items-center justify-center text-[12px]",
        className,
      )}
      {...props}
    />
  ),
);
CardOption.displayName = "CardOption";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("ml-[80px]", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export { Card, CardHeader, CardOption, CardFooter, CardContent, CardDescription, CardSeperate };
