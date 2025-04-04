import MemberListContainer from "../_components/MemberListContainer";
import Header from "./_components/Header";
import SelectTimeRouteButton from "./_components/SelectTimeRouteButton";

function FixedReservation() {
  return (
    <main className="flex h-full flex-col">
      <Header />
      <MemberListContainer renderFooterReservationButton={SelectTimeRouteButton} />
    </main>
  );
}

export default FixedReservation;
