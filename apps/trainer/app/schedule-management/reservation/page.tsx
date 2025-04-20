import { Suspense } from "react";

import MemberListContainer from "../_components/MemberListContainer";
import Header from "./_components/Header";
import ReservationAdderButton from "./_components/ReservationAdderButton";

function Reservation() {
  return (
    <main className="flex h-full flex-col">
      {/** TODO: prerender 오류 방지를 위한 임시 fallback으로 추후 수정 */}
      <Suspense fallback={<div>preRender 오류 방지를 위한 임시 fallback</div>}>
        <Header />
      </Suspense>
      <MemberListContainer renderFooterReservationButton={ReservationAdderButton} />
    </main>
  );
}

export default Reservation;
