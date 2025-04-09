/* eslint-disable no-magic-numbers */
import { TrainerConnectStatus } from "../_types/addReservation";

interface PopupData {
  title: string;
  description: string;
  popupCloseLabel: string;
  popupCloseCallback: () => void;
}

export const resolveTrainerConnectionFlow = (
  trainerConnectStatus: TrainerConnectStatus,
  ptCount: number,
  onRequestConnect: () => void,
  onGoNewReservation: () => void,
) => {
  const connectionPlan: Record<
    TrainerConnectStatus,
    (ptCount: number) => { popupData: PopupData | null; onClickButton: () => void }
  > = {
    CONNECTED: () => {
      if (ptCount === 0) {
        return {
          popupData: {
            title: "등록 PT 횟수가 모두 소진되어\n 예약을 진행할 수 없습니다",
            description: "횟수 추가는 트레이너에게 문의해 주세요",
            popupCloseLabel: "확인",
            popupCloseCallback: () => {},
          },
          onClickButton: () => {},
        };
      }

      return {
        popupData: null,
        onClickButton: onGoNewReservation,
      };
    },
    REQUESTED: () => {
      return {
        popupData: {
          title: "트레이너에게 연동 요청중입니다",
          description: "연동 승인 시 본 서비스를 이용하실 수 있습니다",
          popupCloseLabel: "확인",
          popupCloseCallback: () => {},
        },
        onClickButton: () => {},
      };
    },
    UNCONNECTED: () => {
      return {
        popupData: {
          title: "트레이너와 연동이 필요합니다",
          description: "연동 요청 후 승인 시 본 서비스를 이용하실 수 있습니다",
          popupCloseLabel: "연동 요청하기",
          popupCloseCallback: onRequestConnect,
        },
        onClickButton: () => {},
      };
    },
  };

  return connectionPlan[trainerConnectStatus](ptCount);
};
