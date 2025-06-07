import { Suspense } from "react";

import MemberListContainer from "../_components/MemberListContainer";
import Header from "./_components/Header";
import SelectTimeRouteButton from "./_components/SelectTimeRouteButton";
import MemberContainerFallback from "../_components/Fallback/MemberContainerFallback";

function FixedReservation() {
  return (
    <main className="flex h-full flex-col">
      <Header />
      <Suspense fallback={<MemberContainerFallback />}>
        <MemberListContainer renderFooterReservationButton={SelectTimeRouteButton} />
      </Suspense>
    </main>
  );
}

export default FixedReservation;
