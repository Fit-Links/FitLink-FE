import React from "react";

import RouteInstance from "@trainer/constants/route";

import { requireAuth } from "@trainer/utils/auth";

async function NotificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth(RouteInstance.notification());

  return <>{children}</>;
}

export default NotificationLayout;
