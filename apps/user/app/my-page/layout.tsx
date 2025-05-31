import { ReactNode } from "react";

import { requireAuth } from "@user/utils/auth";

async function MyPageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAuth();

  return <>{children}</>;
}

export default MyPageLayout;
