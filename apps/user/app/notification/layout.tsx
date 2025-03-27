import Header from "@ui/components/Header";
import React from "react";

type NotificationLayoutProps = Readonly<{
  children: React.ReactNode;
}>;
function NotificationLayout({ children }: NotificationLayoutProps) {
  return (
    <>
      <Header>
        <Header.Title content="알림" />
      </Header>
      {children}
    </>
  );
}

export default NotificationLayout;
