/* eslint-disable no-magic-numbers */
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { startOfMonth, addHours, format } from "date-fns";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { myInformationQueries } from "@user/queries/myInformation";
import { reservationQueries } from "@user/queries/reservation";

import LoadingFallback from "@user/components/Fallback/LoadingFallback";

import Header from "./_components/Header";
import ReservationContainer from "./_components/ReservationContainer";
import { RequestReservationMode } from "./types/requestReservation";

export type ReservationParams = {
  params: {
    mode: RequestReservationMode;
  };
  searchParams?: {
    reservationDate?: string;
  };
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ mode: "new" }, { mode: "edit" }];
}

async function Reservation({ params, searchParams }: ReservationParams) {
  const { mode } = params;

  if (mode !== "new" && mode !== "edit") notFound();

  const [reservationDate, reservationDateTime] = searchParams?.reservationDate?.split("T") ?? [];

  const queryClient = new QueryClient();

  const today = new Date();
  const firstDayOfMonthUTC = startOfMonth(today);
  const firstDayOfMonthKorea = format(addHours(firstDayOfMonthUTC, 9), "yyyy-MM-dd");

  await Promise.all([
    queryClient.prefetchQuery(myInformationQueries.summary()),
    queryClient.prefetchQuery(reservationQueries.list(firstDayOfMonthKorea)),
  ]);

  return (
    <main className="flex h-full flex-col items-center overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header mode={mode} />
        <Suspense fallback={<LoadingFallback />}>
          <ReservationContainer
            mode={mode}
            reservationDate={reservationDate}
            reservationDateTime={reservationDateTime}
            firstDayOfMonthKorea={firstDayOfMonthKorea}
          />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}

export default Reservation;
