import { ReservationStatus } from "@5unwan/core/api/types/common";
import { Badge } from "@ui/components/Badge";
import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { MouseEvent, useEffect, useState } from "react";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

type ReservationOutcomeSheetProps = {
  reservationStatus: Extract<ReservationStatus, "수업 완료" | "예약 확정">;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformation: ModifiedReservationListItem;
};

/** TODO:  불참석/PT 완료 시 캘린더 데이터 refetch,
 * 이미 지난 수업, 예정 수업을 현재 날짜 기준으로 분기처리하여 어떤 시트를 보여줄 것인지 로직 구현 */
function ReservationOutcomeSheet({
  reservationStatus,
  open,
  onChangeOpen,
  selectedDate,
  memberInformation,
}: ReservationOutcomeSheetProps) {
  const { memberInfo } = memberInformation;
  /** TODO: memberId로 특정 회원의 상세 정보를 불러와 이미지,번호,생일,총 PT횟수, 잔여 PT 횟수 불러오기 */
  const { name } = memberInfo;
  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  /** TODO: status를 useState가 아닌 status가 "수업 완료"일 경우
   * 특정 멤버 pt 내역 조회 API를 통해 reservationDate를 대조하여 세션 참석 여부를 뱃지로 나타내기 */
  const [status, setStatus] = useState(reservationStatus);

  const handleClickChangeStatus = (event: MouseEvent<HTMLButtonElement>) => {
    setStatus(event.currentTarget.textContent as typeof reservationStatus);
  };

  /** refetch되어 예약 상태가 변경되면 변경된 상태를 status에 주입 */
  useEffect(() => {
    setStatus(reservationStatus);
  }, [reservationStatus]);

  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
        <SheetHeader className="items-center">
          <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
          {status !== "예약 확정" && <Badge className="h-8 w-20">{status}</Badge>}
        </SheetHeader>
        <ProfileCard
          imgUrl={""}
          userBirth={new Date()}
          userName={name as string}
          phoneNumber={""}
          className="bg-background-sub1 w-full hover:bg-none"
        />
        <SheetFooter>
          {status === "예약 확정" ? (
            <div className="flex w-full justify-center gap-[0.625rem]">
              <Button
                className="h-[3.375rem] w-full"
                variant={"secondary"}
                onClick={handleClickChangeStatus}
              >
                불참석
              </Button>
              <Button
                className="h-[3.375rem] w-full"
                variant={"negative"}
                onClick={handleClickChangeStatus}
              >
                PT 완료
              </Button>
            </div>
          ) : (
            <SheetClose asChild>
              <Button variant={"secondary"} className="h-[3.375rem] w-full">
                확인
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ReservationOutcomeSheet;
