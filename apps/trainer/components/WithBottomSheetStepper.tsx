"use client";

import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import Stepper from "@ui/components/Stepper";
import { cn } from "@ui/lib/utils";
import { ComponentType, ReactNode, useState } from "react";

type WithBottomSheetStepperProps = {
  className?: string;
  title: string;
  description?: string;
  incrementOptions?: number[];
  children: ReactNode;
};

type WrappedComponentProps = {
  value: number;
  onChangeOpen: (isOpen: boolean) => void;
};

const INITIALSTEP = 0;

export const WithBottomSheetStepper = (WrappedComponent: ComponentType<WrappedComponentProps>) => {
  return function BottomSheetWithStepper({
    className,
    title,
    description,
    incrementOptions,
    children,
  }: WithBottomSheetStepperProps) {
    const [step, setStep] = useState(INITIALSTEP);
    const [openBottomSheet, setOpenBottomSheet] = useState(false);

    const handleChangeValueIncrementValue = (incrementValue: number) => () => {
      setStep((previousValue) => previousValue + incrementValue);
    };

    const handleChangeValue = (value: number) => {
      setStep(value);
    };

    const handleClickSheetVisible = (isOpen: boolean) => {
      setOpenBottomSheet(isOpen);
    };

    return (
      <Sheet open={openBottomSheet} onOpenChange={handleClickSheetVisible}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          side={"bottom"}
          className={cn("flex h-fit w-full flex-col items-center", className)}
        >
          <SheetHeader className={cn("items-center", !description && "mb-0")}>
            {title && <SheetTitle className={cn(!description && "mb-0")}>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <div className="mb-[1.25rem] flex">
            {incrementOptions &&
              incrementOptions.map((value) => (
                <Button
                  key={value}
                  variant={"negative"}
                  className="text-headline h-[2rem] w-[4.875rem] rounded-full"
                  onClick={handleChangeValueIncrementValue(value)}
                >
                  +{value}회
                </Button>
              ))}
          </div>
          <Stepper value={step} onChangeValue={handleChangeValue} className="border-none" />
          <SheetFooter className="w-full">
            <WrappedComponent value={step} onChangeOpen={handleClickSheetVisible} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };
};
