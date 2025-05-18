import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { myInformationQueries } from "@user/queries/myInformation";

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

  await queryClient.prefetchQuery(myInformationQueries.summary());

  return (
    <main className="flex h-full flex-col items-center overflow-hidden">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header mode={mode} />
        <ReservationContainer
          mode={mode}
          reservationDate={reservationDate}
          reservationDateTime={reservationDateTime}
        />
      </HydrationBoundary>
    </main>
  );
}

export default Reservation;
