import dynamic from "next/dynamic";
import React from "react";

const EditScheduleFunnel = dynamic(() => import("./_components/EditScheduleFunnel"), {
  ssr: false,
});

export default function page() {
  return (
    <main className="h-full w-full">
      <EditScheduleFunnel />
    </main>
  );
}
