import { NextResponse } from "next/server";

import { getUserVerificationStatus } from "@user/services/auth";

import { devTrainer, prodTrainer } from "@user/constants/pathname";

export const handleRedirectByUserRole = async (hostname: string) => {
  try {
    const userRole = await getUserVerificationStatus();

    if (userRole.data.userRole === "TRAINER") {
      if (hostname.includes("dev.user")) {
        return NextResponse.redirect(new URL(devTrainer));
      } else if (hostname.includes("user")) {
        return NextResponse.redirect(new URL(prodTrainer));
      }
    }
  } catch (error) {
    console.error("Role Error >>>", error);
  }
};
