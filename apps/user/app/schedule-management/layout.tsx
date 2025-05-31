import { ReactNode } from "react";

import { requireAuth } from "@user/utils/auth";

async function ScheduleManagementLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAuth();

  return <>{children}</>;
}

export default ScheduleManagementLayout;
