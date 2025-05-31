import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import React, { ComponentProps, ReactNode } from "react";

type RequestSucccessSheetTriggerProps = ComponentProps<typeof SheetTrigger>;

type RequestSuccessSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  title: string;
  description?: string;
  closeSheetText: string;
  onClickCloseButton?: () => void;
  children?: ReactNode;
};

export function RequestSucccessSheetTrigger({ children }: RequestSucccessSheetTriggerProps) {
  return <SheetTrigger asChild>{children}</SheetTrigger>;
}

function RequestSuccessSheet({
  open,
  onChangeOpen,
  title,
  description,
  closeSheetText,
  onClickCloseButton,
  children,
}: RequestSuccessSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      {children}
      <SheetContent side="bottom" className="md:w-mobile md:inset-x-[calc((100%-480px)/2)]">
        <SheetHeader className="flex flex-col items-center">
          <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
            <Icon name="Check" size="lg" />
          </Button>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={onClickCloseButton} className="h-[3.375rem] w-full">
              {closeSheetText}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default RequestSuccessSheet;
