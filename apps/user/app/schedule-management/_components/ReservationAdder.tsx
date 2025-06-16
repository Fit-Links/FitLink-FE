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
import { addDays, format, isWithinInterval, startOfDay } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";

import { myInformationQueries } from "@user/queries/myInformation";

import RouteInstance from "@user/constants/routes";

import { resolveTrainerConnectionFlow } from "../_utils/resolveTrainerConnectionFlow";

function ReservationAdder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");
  const koreanDate = dateParam ? startOfDay(new Date(dateParam)) : startOfDay(new Date());

  const [isWithinTwoWeeks, setIsWithinTwoWeeks] = useState(false);

  const { data: myInformation } = useQuery(myInformationQueries.summary());

  const onGoNewReservation = () => {
    const isCheckedWithInTwoWeeks = isWithinInterval(koreanDate, {
      start: startOfDay(new Date()),
      end: addDays(new Date(), 13),
    });

    if (isCheckedWithInTwoWeeks) {
      router.push(
        RouteInstance.reservation("new", {
          selectedDate: format(koreanDate, "yyyy-MM-dd"),
        }),
      );

      return;
    }

    setIsWithinTwoWeeks(true);
  };

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

  return (
    <>
      <AddReservationButton onClick={onClickButton} />
      <Dialog open={isWithinTwoWeeks} onOpenChange={setIsWithinTwoWeeks}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="whitespace-pre">
              {"예약 가능 기간은\n현재로부터 2주 이내입니다"}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full">확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
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
