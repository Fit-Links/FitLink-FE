/** TODO: 예약 대기 내역 구현이 완료되지 않아 에러 방지를 위한 주석 처리 */
// import { ModifiedReservationListItem } from "@trainer/services/types/reservations.dto";

// import Header from "./_components/Header";
// // import PendingReservationContainer from "./_components/PendingReservationContainer";

// type PendingReservationsProps = {
//   searchParams: { members: string; selectedDate: string };
// };
// function PendingReservations({ searchParams }: PendingReservationsProps) {
//   const members: ModifiedReservationListItem[] = JSON.parse(
//     decodeURIComponent(searchParams.members),
//   );

//   return (
//     <main className="flex h-full flex-col">
//       <Header />
//       {/* <PendingReservationContainer
//         memberInformations={members}
//         selectedDate={searchParams.selectedDate}
//       /> */}
//     </main>
//   );
// }

// export default PendingReservations;

// 빌드 에러 방지를 위한 Dummy export
function page() {
  return <div></div>;
}

export default page;
