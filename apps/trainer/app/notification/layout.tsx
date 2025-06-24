import React from "react";

import RouteInstance from "@trainer/constants/route";

import { requireAuth } from "@trainer/utils/auth";

import NotificationProvider from "./_components/NotificationProvider";

async function NotificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth(RouteInstance.notification());

  return <NotificationProvider>{children}</NotificationProvider>;
}

export default NotificationLayout;
