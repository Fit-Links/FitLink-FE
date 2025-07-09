"use client";

import Header from "@ui/components/Header";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

import Fallback from "./_components/Fallback";
import NotificationContainer from "./_components/NotificationContainer";

function NotificationPage() {
  return (
    <>
      <Header>
        <Header.Title content="알림" />
      </Header>
      <main className="h-full w-full">
        <Suspense fallback={<Fallback />}>
          <NotificationContainer />
        </Suspense>
      </main>
    </>
  );
}

export default NotificationPage;
