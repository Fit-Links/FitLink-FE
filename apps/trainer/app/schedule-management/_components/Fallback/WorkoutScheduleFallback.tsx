import Spinner from "@ui/components/Spinner";
import React from "react";

function WorkoutScheduleFallback() {
  return (
    <div className="flex h-28 w-40 flex-col items-center justify-center gap-1 rounded-md p-2">
      <Spinner />
    </div>
  );
}

export default WorkoutScheduleFallback;
