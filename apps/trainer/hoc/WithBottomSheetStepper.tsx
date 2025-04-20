/* eslint-disable no-magic-numbers */
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

import { PtUser } from "@trainer/services/types/userManagement.dto";

type WithBottomSheetStepperProps = {
  className?: string;
  title: string;
  description?: string;
  incrementOptions?: number[];
  children?: ReactNode;
  initialStep?: number;
  open?: boolean;
  onChangeOpen?: (isOpen: boolean) => void;
  selectedMemberInformation: PtUser | null;
};

type ApproveOrModifyCTAButtonProps = {
  value: number;
  onChangeClose: (isOpen: boolean) => void;
  selectedMemberInformation: PtUser | null;
};

export const WithBottomSheetStepper = (
  ApproveOrModifyCTAButton: ComponentType<ApproveOrModifyCTAButtonProps>,
) => {
  return function BottomSheetWithStepper({
    className,
    title,
    description,
    incrementOptions,
    children,
    selectedMemberInformation,
    initialStep,
    open,
    onChangeOpen,
  }: WithBottomSheetStepperProps) {
    const [step, setStep] = useState(initialStep || 0);
    const [openBottomSheet, setOpenBottomSheet] = useState(false);

    const handleChangeValueIncrementValue = (incrementValue: number) => () => {
      setStep((previousValue) => previousValue + incrementValue);
    };

    const handleChangeValue = (value: number) => {
      setStep(value);
    };

    const handleClickSheetVisible = (isOpen: boolean) => {
      if (onChangeOpen) {
        onChangeOpen(isOpen);

        return;
      }

      setOpenBottomSheet(isOpen);
    };

    return (
      <Sheet open={open || openBottomSheet} onOpenChange={onChangeOpen || handleClickSheetVisible}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent
          side={"bottom"}
          className={cn(
            "md:max-w-mobile left-1/2 flex h-fit w-full -translate-x-1/2 flex-col items-center",
            className,
          )}
        >
          <SheetHeader className={cn("items-center", !description && "mb-0")}>
            {title && <SheetTitle className={cn(!description && "mb-0")}>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <div className={cn("mb-[1.25rem] flex gap-2.5", !description && "my-[1.26rem]")}>
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
            <ApproveOrModifyCTAButton
              value={step}
              onChangeClose={handleClickSheetVisible}
              selectedMemberInformation={selectedMemberInformation}
            />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };
};
