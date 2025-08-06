import { NextResponse } from "next/server";

import { getUserVerificationStatus } from "@trainer/services/auth";

import { devUser, prodUser } from "@trainer/constants/pathname";

export const handleRedirectByUserRole = async (hostname: string) => {
  try {
    const userRole = await getUserVerificationStatus();

    if (userRole.data.userRole === "MEMBER") {
      if (hostname.includes("dev.trainer")) {
        return NextResponse.redirect(new URL(devUser));
      } else if (hostname.includes("trainer")) {
        return NextResponse.redirect(new URL(prodUser));
      }
    }
  } catch (error) {
    console.error("Role Error >>>", error);
  }
};
