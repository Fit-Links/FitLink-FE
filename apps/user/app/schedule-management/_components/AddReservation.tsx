"use client";

import { Button } from "@ui/components/Button";
import Icon from "@ui/components/Icon";
import { Popup } from "@ui/components/Popup";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

import { ROUTES } from "../_constants/route";
import { TrainerConnectStatus } from "../_types/addReservation";
import { resolveTrainerConnectionFlow } from "../_utils/resolveTrainerConnectionFlow";

type AddReservationProps = {
  trainerConnectStatus: TrainerConnectStatus;
  ptCount: number;
};

function AddReservation({ trainerConnectStatus, ptCount }: AddReservationProps) {
  const router = useRouter();

  const onGoNewReservation = () => router.push(`${ROUTES.ROOT}/${ROUTES.NEW_RESERVATION}`);
  const onRequestConnect = () => router.push(ROUTES.TRAINER_CODE);

  const { popupData, onClickButton } = resolveTrainerConnectionFlow(
    trainerConnectStatus,
    ptCount,
    onRequestConnect,
    onGoNewReservation,
  );

  if (popupData) {
    const { title, description, positiveCallback, positiveLabel } = popupData;

    return (
      <Popup
        title={title}
        description={description}
        positive={{ label: positiveLabel, callback: positiveCallback }}
      >
        <AddReservationButton onClick={onClickButton} />
      </Popup>
    );
  }

  return <AddReservationButton onClick={onClickButton} />;
}

export default AddReservation;

function AddReservationButton(props: ComponentPropsWithoutRef<"button">) {
  return (
    <Button
      className="absolute bottom-3 right-3 flex h-[2.813rem] w-[2.813rem] cursor-pointer items-center justify-center rounded-full"
      {...props}
    >
      <Icon name="Plus" size="lg" />
    </Button>
  );
}
