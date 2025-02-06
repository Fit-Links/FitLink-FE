import { cva } from "class-variance-authority";

export const colorVariants = {
  default: "bg-background-sub4 text-text-sub5",
  sub1: "bg-background-sub1 text-text-primary",
  sub2: "bg-background-sub2 text-text-primary",
  brand: "bg-brand-primary-500 text-text-primary",
  destructive: "bg-notification text-text-primary",
};

export const notificationVariants = cva(
  "absolute flex items-center justify-center rounded-full text-[10px] focus:outline-none transition-colors shadow",
  {
    variants: {
      variant: colorVariants,
      size: {
        xl: "h-[18px] w-[18px] -right-[6px] -top-[6px]",
        lg: "h-[18px] w-[18px] -right-[6px] -top-[6px]",
        md: "h-[14px] w-[14px] -right-[5px] -top-[5px]",
        sm: "h-[14px] w-[14px] -right-[5px] -top-[4.5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
