import React from "react";

import RouteInstance from "@trainer/constants/route";

import { requireAuth } from "@trainer/utils/auth";

async function ScheduleManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth(RouteInstance["schedule-management"]());

  return <>{children}</>;
}

export default ScheduleManagementLayout;
