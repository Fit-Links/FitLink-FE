import dynamic from "next/dynamic";
import React from "react";

import { commonLayoutContents } from "@trainer/constants/styles";

const EditScheduleFunnel = dynamic(() => import("./_components/EditScheduleFunnel"), {
  ssr: false,
});

export default function page() {
  return (
    <main className={commonLayoutContents}>
      <EditScheduleFunnel />
    </main>
  );
}
