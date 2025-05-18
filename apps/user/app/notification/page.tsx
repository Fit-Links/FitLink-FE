import { Suspense } from "react";

export const dynamic = "force-dynamic";

import Fallback from "./_components/Fallback";
import NotificationContainer from "./_components/NotificationContainer";

function NotificationPage() {
  return (
    <main className="h-full w-full">
      <Suspense fallback={<Fallback />}>
        <NotificationContainer />
      </Suspense>
    </main>
  );
}

export default NotificationPage;
