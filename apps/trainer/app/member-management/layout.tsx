import React from "react";

import RouteInstance from "@trainer/constants/route";

import { requireAuth } from "@trainer/utils/auth";

async function MemberManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth(RouteInstance["member-management"]());

  return <>{children}</>;
}

export default MemberManagementLayout;
