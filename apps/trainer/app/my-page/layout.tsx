import React from "react";

import RouteInstance from "@trainer/constants/route";

import { requireAuth } from "@trainer/utils/auth";

async function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth(RouteInstance["my-page"]());

  return <>{children}</>;
}

export default MyPageLayout;
