"use client";

import { Button } from "@ui/components/Button";
import { cn } from "@ui/lib/utils";

type PtHistoryFilterButtonProps = {
  ptStatusOptions: string[];
  selectedPtStatus: string;
  onChangeSelectedPtStatus: (status: string) => void;
};

function PtHistoryFilterButton({
  ptStatusOptions,
  selectedPtStatus,
  onChangeSelectedPtStatus,
}: PtHistoryFilterButtonProps) {
  const handleClick = (status: string) => () => {
    onChangeSelectedPtStatus(status);
  };

  return (
    <div className="flex space-x-2">
      {ptStatusOptions.map((status) => (
        <Button
          key={status}
          onClick={handleClick(status)}
          className={cn(
            "bg-background-sub2 text-body-1 hover:bg-background-sub5 hover:text-text-sub5 h-8 rounded-[0.625rem] px-[0.813rem] py-[0.625rem] transition-colors",
            {
              "bg-background-sub5 text-text-sub5": status === selectedPtStatus,
            },
          )}
        >
          {status}
        </Button>
      ))}
    </div>
  );
}

export default PtHistoryFilterButton;
