"use client";

import { Suspense } from "react";

export const dynamic = "force-dynamic";

import HeaderProvider from "@user/components/Providers/HeaderProvider";

import { commonLayoutContents } from "@user/constants/styles";

import Fallback from "./_components/Fallback";
import NotificationContainer from "./_components/NotificationContainer";

function NotificationPage() {
  return (
    <>
      <HeaderProvider title="알림">
        <main className={commonLayoutContents}>
          <Suspense fallback={<Fallback />}>
            <NotificationContainer />
          </Suspense>
        </main>
      </HeaderProvider>
    </>
  );
}

export default NotificationPage;
