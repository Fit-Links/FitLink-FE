import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@ui/components/Sheet";
import DateController from "@ui/lib/DateController";
import { useRouter } from "next/navigation";

import { userManagementQueries } from "@trainer/queries/userManagement";

import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import ProfileCard from "@trainer/components/ProfileCard";

import RouteInstance from "@trainer/constants/route";

import ProfileCardFallback from "../Fallback/ProfileCardFallback";

type ReservationChangeRequestBottomSheetProps = {
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  memberInformation: ModifiedReservationListItem;
};

function ReservationChangeRequestBottomSheet({
  open,
  onChangeOpen,
  selectedDate,
  memberInformation,
}: ReservationChangeRequestBottomSheetProps) {
  const router = useRouter();

  const { memberInfo } = memberInformation;
  const { memberId, name } = memberInfo;

  const selectedFormatDate = DateController(selectedDate).toDateTimeWithDayFormat();

  const { data: userInformationDetail, isLoading: userInformationDetailLoading } = useQuery({
    ...userManagementQueries.detail(memberId as number),
    enabled: !!memberId,
  });

  const handleClicMovekNotificationPage = () => {
    router.push(RouteInstance.notification("reservation-change"));
  };

  return (
    <Sheet open={open} onOpenChange={onChangeOpen}>
      <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
        <SheetHeader className="items-center">
          <SheetTitle className="flex justify-center">{selectedFormatDate}</SheetTitle>
          <SheetDescription className="whitespace-pre-line text-center">
            {`${name}님이 예약 변경을 요청하였습니다.\n예약 페이지에서 요청 사항을 확인하고 거절 또는 승인해주세요.`}
          </SheetDescription>
        </SheetHeader>
        {userInformationDetailLoading ? (
          <ProfileCardFallback />
        ) : (
          userInformationDetail && (
            <ProfileCard
              imgUrl={userInformationDetail.data.profilePictureUrl}
              userBirth={new Date(userInformationDetail.data.birthDate)}
              userName={userInformationDetail.data.name}
              phoneNumber={userInformationDetail.data.phoneNumber}
              className="bg-background-sub1 w-full md:hover:bg-none"
            />
          )
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button className="h-[3.375rem] w-full" onClick={handleClicMovekNotificationPage}>
              알림 페이지로 이동
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ReservationChangeRequestBottomSheet;
