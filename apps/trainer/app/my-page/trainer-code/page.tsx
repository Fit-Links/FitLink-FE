import React from "react";

import Header from "../_components/Header";
import TrainerCodeContainer from "./_components/TrainerCodeContainer";

export default function page() {
  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center px-4">
      <Header title="트레이너 코드" />
      <TrainerCodeContainer />
    </main>
  );
}
