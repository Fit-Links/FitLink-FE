import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-headline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        brand: "bg-brand-primary-500 text-text-primary shadow hover:bg-brand-primary-500/90",
        negative: "bg-background-sub5 text-text-sub5 shadow hover:bg-background-sub5/90",
        dark: "bg-background-sub1 text-text-primary shadow hover:bg-background-sub2",
        destructive: "bg-notification text-text-primary shadow hover:bg-notification/90",
      },
      size: {
        sm: "h-[2rem] text-body-1 px-[1rem]",
        md: "h-[2.5rem] text-headline px-[2.625rem]",
        lg: "h-[3.375rem] text-headline px-[4.5rem]",
        icon: "h-[2.8125rem] w-[2.8125rem]",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
