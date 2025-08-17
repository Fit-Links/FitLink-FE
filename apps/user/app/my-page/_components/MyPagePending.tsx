import Spinner from "@ui/components/Spinner";
import React from "react";

function MyPagePending() {
  return (
    <section className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-md">
      <Spinner />
    </section>
  );
}

export default MyPagePending;
