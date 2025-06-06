import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@trainer/constants/token";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);

    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, status: 500 });
  }
}
