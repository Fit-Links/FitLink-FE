import { cookies } from "next/headers";
import React from "react";

import Splash from "@user/components/Splash";

export default function page() {
  // Test comment for user preview deployment
  const cookieStore = cookies();

  const refreshToken = cookieStore.get("refresh-token")?.value;

  return (
    <main className="h-full w-full">
      <Splash refreshToken={refreshToken} />
    </main>
  );
}
