import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import Icon, { IconNames } from "./Icon";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-1 px-4 justify-center whitespace-nowrap text-headline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-background-sub2 disabled:text-text-sub3 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "bg-brand-primary-500 text-text-primary shadow hover:bg-brand-primary-500/90",
        negative: "bg-background-sub5 text-text-sub5 shadow hover:bg-background-sub5/90",
        secondary: "bg-background-sub1 text-text-primary shadow hover:bg-background-sub2",
        outline:
          "bg-transparent text-text-sub2 border border-solid border-background-sub4 hover:border-background-sub5 hover:bg-background-sub5 hover:text-text-sub5",
        ghost: "bg-transparent text-text-primary hover:bg-background-sub3",
        destructive: "bg-notification text-text-primary shadow hover:bg-notification/90",
      },
      size: {
        sm: "h-[2rem] text-body-3",
        md: "h-[2.5rem] text-body-1",
        lg: "h-[2.8125rem] text-headline",
        xl: "h-[3.375rem] text-headline",
      },
      corners: {
        rounded: "rounded-[0.625rem]",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
      corners: "rounded",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: IconNames;
  iconRight?: IconNames;
  danger?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      corners,
      asChild = false,
      iconLeft,
      iconRight,
      danger,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, corners, className }), {
          "text-notification": danger,
          "border-notification": variant === "outline" && danger,
        })}
        ref={ref}
        {...props}
      >
        {iconLeft && (
          <Icon name={iconLeft} size={size || "md"} aria-hidden={children !== undefined} />
        )}
        {children}
        {iconRight && (
          <Icon name={iconRight} size={size || "md"} aria-hidden={children !== undefined} />
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
