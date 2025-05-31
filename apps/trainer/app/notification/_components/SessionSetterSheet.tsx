import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import Stepper from "@ui/components/Stepper";
import { useState } from "react";

// eslint-disable-next-line no-magic-numbers
const INCREMENT_OPTIONS = [5, 10, 20];
const DEFAULT_SESSION = 0;

type SessionSetterSheetProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (totalCount: number, remainingCount: number) => void;
};

function SessionSetterSheet({ isOpen, onOpenChange, onSubmit }: SessionSetterSheetProps) {
  const [sessionValue, setSessionValue] = useState(DEFAULT_SESSION);

  const handleSessionAdderHintClick = (value: number) => () => {
    setSessionValue((prev) => prev + value);
  };

  const handleSubmit = () => {
    onSubmit(sessionValue, sessionValue);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="md:w-mobile flex h-fit flex-col items-center md:inset-x-[calc((100%-480px)/2)]"
      >
        <SheetHeader className="items-center">
          <SheetTitle>PT 횟수 입력</SheetTitle>
          <SheetDescription>회원님의 PT 횟수를 입력하여 연동을 승인해주세요</SheetDescription>
        </SheetHeader>
        <div className="mb-[1.25rem] flex gap-2.5">
          {INCREMENT_OPTIONS &&
            INCREMENT_OPTIONS.map((value) => (
              <Button
                key={`increment-${value}`}
                variant="negative"
                className="text-headline h-[2rem] w-[4.875rem] rounded-full"
                onClick={handleSessionAdderHintClick(value)}
              >
                +{value}회
              </Button>
            ))}
        </div>
        <Stepper value={sessionValue} onChangeValue={setSessionValue} className="border-none" />
        <SheetFooter className="w-full">
          <Button onClick={handleSubmit} className="w-full">
            승인
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SessionSetterSheet;
