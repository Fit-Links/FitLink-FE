import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Spinner from "@ui/components/Spinner";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import RequestSuccessSheet from "@user/app/schedule-management/_components/BottomSheet/RequestSuccessSheet";
import { myInformationQueries } from "@user/queries/myInformation";

import RouteInstance from "@user/constants/routes";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

import { useReservationChangeMutation } from "../../../_hooks/mutation/useReservationChangeMutation";
import { useReservationRequestMutation } from "../../../_hooks/mutation/useReservationRequestMutation";

type ReservationRequestorProps = {
  mode: RequestReservationMode;
  open: boolean;
  onChangeOpen: (isOpen: boolean) => void;
  selectedDate: Date;
  selectedTime: string[];
  isActive: boolean;
};

const MODE_CONTENT_MAP: Record<
  RequestReservationMode,
  {
    title: string;
    description: string;
    buttonText: string;
  }
> = {
  new: {
    title: "트레이너에게 PT 예약을 요청했습니다",
    description: "트레이너가 예약 요청 승인 시 예약이 확정돼요",
    buttonText: "요청하기",
  },
  edit: {
    title: "트레이너에게\nPT 예약 변경을 요청했습니다",
    description: "트레이너가 승인 시 회원에게 알림이 전송돼요",
    buttonText: "변경",
  },
};

function ReservationRequestor({
  mode,
  open,
  onChangeOpen,
  isActive,
  selectedDate,
  selectedTime,
}: ReservationRequestorProps) {
  const router = useRouter();
  const {
    reservationRequest,
    isSuccess: reservationRequestSuccess,
    isPending: reservationRequestPending,
  } = useReservationRequestMutation();
  const {
    reservationChange,
    isSuccess: reservationChangeSuccess,
    isPending: reservationChangePending,
  } = useReservationChangeMutation();
  const searchParams = useSearchParams();

  const { data: myInformation } = useQuery(myInformationQueries.summary());

  const formattedDateTimes = selectedTime.map(
    (time: string) => `${format(selectedDate, "yyyy-MM-dd")}T${time}`,
  );

  const handleClickRequestButton = () => {
    if (!myInformation || !myInformation.data.trainerId) return;
    if (mode === "new") {
      reservationRequest({
        trainerId: myInformation.data?.trainerId,
        memberId: myInformation.data?.memberId,
        name: myInformation.data?.name,
        dates: formattedDateTimes,
      });
    } else {
      reservationChange({
        reservationId: Number(searchParams.get("reservationId")),
        reservationDate: searchParams.get("reservationDate")?.replace(/:00$/, "") as string,
        changeRequestDate: formattedDateTimes[0],
      });
    }
  };

  const handleClickCloseButton = () => {
    onChangeOpen(false);

    router.push(RouteInstance["schedule-management"]());
  };

  useEffect(() => {
    if (reservationRequestSuccess || reservationChangeSuccess) {
      onChangeOpen(true);
    }
  }, [reservationRequestSuccess, reservationChangeSuccess]);

  return (
    <>
      <Button
        disabled={!isActive}
        onClick={handleClickRequestButton}
        className="h-[3.375rem] w-full"
      >
        {reservationRequestPending || reservationChangePending ? (
          <Spinner />
        ) : (
          MODE_CONTENT_MAP[mode].buttonText
        )}
      </Button>
      <RequestSuccessSheet
        open={open}
        onChangeOpen={onChangeOpen}
        title={MODE_CONTENT_MAP[mode].title}
        description={MODE_CONTENT_MAP[mode].description}
        closeSheetText="확인"
        onClickCloseButton={handleClickCloseButton}
      />
    </>
  );
}

export default ReservationRequestor;
