"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import AccordionContext from "./context";
import useAccordionContext from "../../hooks/useAccordionContext";
import { cn } from "../../lib/utils";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  icon?: React.ReactNode;
};

const DEFAULT_ICON_SIZE = 0;
const DEFAULT_PADDING = 8;

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const [iconWidth, setIconWidth] = useState(DEFAULT_ICON_SIZE);

  return (
    <AccordionContext.Provider value={{ iconWidth, setIconWidth }}>
      <AccordionPrimitive.Item ref={ref} className={cn("text-text-sub2", className)} {...props} />
    </AccordionContext.Provider>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, icon, ...props }, ref) => {
  const iconRef = useRef<HTMLSpanElement>(null);
  const { setIconWidth } = useAccordionContext("AccordionTrigger");

  useEffect(() => {
    if (!iconRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const width = iconRef.current?.offsetWidth || DEFAULT_ICON_SIZE;
      setIconWidth(width);
    });

    resizeObserver.observe(iconRef.current);

    return () => resizeObserver.disconnect();
  }, [icon]);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "text-title-2 border-background-sub3 mb-3 flex flex-1 items-center border-b py-3 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {icon && (
          <span className="mr-2 items-center" ref={iconRef}>
            {icon}
          </span>
        )}
        <span className="flex flex-1 items-center justify-between">{children}</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const [paddingLeft, setPaddingLeft] = useState(DEFAULT_ICON_SIZE);

  const { iconWidth } = useAccordionContext("AccordionContent");

  useEffect(() => {
    setPaddingLeft(iconWidth ? iconWidth + DEFAULT_PADDING : DEFAULT_ICON_SIZE);
  }, [iconWidth]);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      style={{ paddingLeft: `${paddingLeft}px` }}
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down text-headline overflow-hidden"
      {...props}
    >
      <div className={cn("flex flex-1 items-center justify-between pb-4 pt-0", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
