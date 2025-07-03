import Header from "@ui/components/Header";

import { requireAuth } from "@user/utils/auth";

import NotificationProvider from "./_components/NotificationProvdier";

type NotificationLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
async function NotificationLayout({ children }: NotificationLayoutProps) {
  await requireAuth();

  return (
    <>
      <Header>
        <Header.Title content="알림" />
      </Header>
      <NotificationProvider>{children}</NotificationProvider>
    </>
  );
}

export default NotificationLayout;
