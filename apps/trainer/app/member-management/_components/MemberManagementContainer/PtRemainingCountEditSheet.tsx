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

import { PtUser } from "@trainer/services/types/userManagement.dto";

type PtRemainingCountEditSheetProps = {
  value: number;
  onChangeClose: (isOpen: boolean) => void;
  selectedMemberInformation: PtUser | null;
};

function PtRemainingCountEditSheet({
  value,
  onChangeClose,
  selectedMemberInformation,
}: PtRemainingCountEditSheetProps) {
  const handleClick = () => {
    /** TODO: PT 남은 횟수 변경 API */
  };

  const handleClickCheckButton = () => {
    onChangeClose(false);
  };

  const checkDisabledButton = () => {
    return value === selectedMemberInformation?.sessionInfo.remainingCount;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          disabled={checkDisabledButton()}
          variant="brand"
          className="h-[3.375rem] w-full"
          onClick={handleClick}
        >
          변경
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader className="flex flex-col items-center">
          <Button className="mb-7 h-[3.125rem] w-[3.125rem] rounded-full">
            <Icon name="Check" size="lg" />
          </Button>
          <SheetTitle className="whitespace-pre-line text-center">{`홍길동 회원의\n잔여 PT 횟수가 변경되었습니다`}</SheetTitle>
          <SheetDescription>회원에게 잔여 PT {value}회 추가 알림이 전송돼요</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={handleClickCheckButton} className="h-[3.375rem] w-full">
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default PtRemainingCountEditSheet;
