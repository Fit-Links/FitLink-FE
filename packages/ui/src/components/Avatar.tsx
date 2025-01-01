import { PersonOutlined } from "@mui/icons-material";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import React from "react";

import { cn } from "../lib/utils";

type AvatarProps = {
  disabled?: boolean;
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarProps
>(({ className, disabled, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-[50px] w-[50px] shrink-0 overflow-hidden rounded-full",
      disabled && "pointer-events-none opacity-80 grayscale",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => (
  <>
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "bg-brand-primary-500 flex h-full w-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    >
      {children || <PersonOutlined color="action" />}
    </AvatarPrimitive.Fallback>
  </>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
