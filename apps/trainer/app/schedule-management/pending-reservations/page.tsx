import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

import Header from "./_components/Header";
import PendingReservationContainer from "./_components/PendingReservationContainer";

type PendingReservationsProps = {
  searchParams: { members: string; selectedDate: string };
};
function PendingReservations({ searchParams }: PendingReservationsProps) {
  const members: ModifiedReservationListItem[] = JSON.parse(
    decodeURIComponent(searchParams.members),
  );

  return (
    <main className="flex h-full flex-col">
      <Header />
      <PendingReservationContainer
        memberInformations={members}
        selectedDate={searchParams.selectedDate}
      />
    </main>
  );
}

export default PendingReservations;
