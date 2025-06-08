import React from "react";

import ProfileCardFallback from "./ProfileCardFallback";

function FixedReservationListFallback() {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-2">
      <ProfileCardFallback />
      <ProfileCardFallback />
      <ProfileCardFallback />
      <ProfileCardFallback />
    </div>
  );
}

export default FixedReservationListFallback;
