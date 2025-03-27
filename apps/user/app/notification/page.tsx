import React, { Suspense } from "react";

import NotificationContent from "./_components/NotificationContent";

function NotificationPage() {
  return (
    <main className="h-full w-full">
      <Suspense fallback={<span>loading...</span>}>
        <NotificationContent />
      </Suspense>
    </main>
  );
}

export default NotificationPage;
