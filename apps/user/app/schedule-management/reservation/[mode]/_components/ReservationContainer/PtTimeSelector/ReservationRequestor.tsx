import { Button } from "@ui/components/Button";
import { useRouter } from "next/navigation";

import RequestSuccessSheet, {
  RequestSucccessSheetTrigger,
} from "@user/app/schedule-management/_components/BottomSheet/RequestSuccessSheet";

import RouteInstance from "@user/constants/routes";

import { RequestReservationMode } from "@user/app/schedule-management/reservation/[mode]/types/requestReservation";

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

/** TODO:  props로 selectedDate, selectedTime, */
function ReservationRequestor({ mode, open, onChangeOpen, isActive }: ReservationRequestorProps) {
  const router = useRouter();

  // TODO: selectedDate와 selectedTimes를 통해 예약 변경 요청 진행
  const handleClickRequestButton = () => {
    router.push(RouteInstance.root());
  };

  return (
    <RequestSuccessSheet
      open={open}
      onChangeOpen={onChangeOpen}
      title={MODE_CONTENT_MAP[mode].title}
      description={MODE_CONTENT_MAP[mode].description}
      closeSheetText="확인"
      onClickCloseButton={handleClickRequestButton}
    >
      <RequestSucccessSheetTrigger asChild>
        <Button disabled={!isActive} className="h-[3.375rem] w-full">
          {MODE_CONTENT_MAP[mode].buttonText}
        </Button>
      </RequestSucccessSheetTrigger>
    </RequestSuccessSheet>
  );
}

export default ReservationRequestor;
