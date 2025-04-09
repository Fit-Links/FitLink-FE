import { notFound } from "next/navigation";

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

function Reservation({ params, searchParams }: ReservationParams) {
  const { mode } = params;

  if (mode !== "new" && mode !== "edit") notFound();

  const [reservationDate, reservationDateTime] = searchParams?.reservationDate?.split("T") ?? [];

  return (
    <main className="flex h-full flex-col items-center overflow-hidden">
      <Header mode={mode} />
      <ReservationContainer
        mode={mode}
        reservationDate={reservationDate}
        reservationDateTime={reservationDateTime}
      />
    </main>
  );
}

export default Reservation;
