import MemberListContainer from "../_components/MemberListContainer";
import Header from "./_components/Header";
import ReservationAdderButton from "./_components/ReservationAdderButton";

function Reservation() {
  return (
    <main className="flex h-full flex-col">
      <Header />
      <MemberListContainer renderFooterReservationButton={ReservationAdderButton} />
    </main>
  );
}

export default Reservation;
