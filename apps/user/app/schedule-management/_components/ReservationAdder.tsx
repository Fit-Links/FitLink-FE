/* eslint-disable no-magic-numbers */
"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/Dialog";
import Icon from "@ui/components/Icon";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import RouteInstance from "@user/constants/routes";

import { resolveTrainerConnectionFlow } from "../_utils/resolveTrainerConnectionFlow";

function ReservationAdder() {
  const router = useRouter();

  /** TODO: 내정보 API 호출 후, Response 내의 트레이너 연결 상태 추출 */
  const { data: myInformation } = useQuery(myInformationQueries.summary());

  const onGoNewReservation = () => router.push(RouteInstance.reservation("new"));
  const onRequestConnect = () => router.push(RouteInstance["connect-trainer"]());

  const { popupData, onClickButton } = resolveTrainerConnectionFlow(
    myInformation?.data?.connectingStatus ?? "UNCONNECTED",
    myInformation?.data?.sessionInfo?.totalCount ?? 0,
    onRequestConnect,
    onGoNewReservation,
  );

  if (popupData) {
    const { title, description, popupCloseCallback, popupCloseLabel } = popupData;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <AddReservationButton onClick={onClickButton} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button onClick={popupCloseCallback}>{popupCloseLabel}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <AddReservationButton onClick={onClickButton} />;
}

export default ReservationAdder;

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
