"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] text-body-1 ring-offset-background-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[26px] [&_svg]:shrink-0 gap-[7px] min-w-[52px] h-[32px] px-[13px]",
  {
    variants: {
      variant: {
        default:
          "bg-background-sub2 text-text-primary md:hover:bg-background-sub5 md:hover:text-text-sub5 data-[state=on]:bg-background-sub5 data-[state=on]:text-text-sub5",
        outline:
          "border border-background-sub4 text-text-primary bg-transparent md:hover:border-background-sub5 data-[state=on]:bg-background-sub5 data-[state=on]:text-text-sub5",
        negative:
          "bg-background-sub5 text-text-sub5 md:hover:bg-brand-primary-100 data-[state=on]:bg-brand-primary-500 data-[state=on]:text-text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
