import { cookies } from "next/headers";
import React from "react";

import Splash from "@trainer/components/Splash";

import { REFRESH_TOKEN_KEY } from "@trainer/constants/token";

function page() {
  const cookieStore = cookies();

  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  return (
    <main className="h-full w-full">
      <Splash refreshToken={refreshToken} />
    </main>
  );
}

export default page;
