"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { OTPInput, OTPInputContext } from "input-otp";
import * as React from "react";

import { cn } from "../lib/utils";

const inputOTPSlotVariants = cva(
  "bg-background-sub2 text-text-primary relative flex items-center justify-center text-4xl h-[60px] w-[52.08px] border rounded-l-md border-l rounded-r-md",
  {
    variants: {
      variant: {
        default: "border-0",
        focused: "border-0",
        filled: "border-brand-primary-500",
        error: "border-notification",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput> & {
    errorMessage?: string | null;
  }
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn("gap-2 has-[:disabled]:opacity-50", containerClassName)}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-[6px]", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number } & VariantProps<
      typeof inputOTPSlotVariants
    >
>(({ index, className, variant, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);

  const { char, hasFakeCaret } = inputOTPContext.slots[index];

  return (
    <div ref={ref} className={cn(inputOTPSlotVariants({ variant: variant }), className)} {...props}>
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="bg-brand-primary-500 animate-caret-blink h-8 w-px duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => <div ref={ref} role="separator" {...props}></div>);
InputOTPSeparator.displayName = "InputOTPSeparator";

const InputOTPMessage = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    className?: string;
    children?: React.ReactNode;
    variant?: "default" | "focused" | "filled" | "error";
  }
>(
  ({ className, children, variant, ...props }, ref) =>
    variant === "error" && (
      <p ref={ref} className={cn("text-notification mt-[16px] text-sm", className)} {...props}>
        {children}
      </p>
    ),
);
InputOTPMessage.displayName = "InputOTPMessage";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, InputOTPMessage };
