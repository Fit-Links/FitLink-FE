"use client";

import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { cn } from "../lib/utils";

type StepperProps = {
  defaultValue?: number;
  step?: number;
  getChangeValue: (value: number) => void;
  className?: string;
};

const DEFAULT_VALUE = 0;
const DEFAULT_STEP = 1;

function Stepper({
  defaultValue = DEFAULT_VALUE,
  step = DEFAULT_STEP,
  getChangeValue,
  className,
}: StepperProps) {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const handleClickDecrease = () => {
    setCurrentValue((previousValue) => previousValue - step);
  };

  const handleClickIncrease = () => {
    setCurrentValue((previousValue) => previousValue + step);
  };

  useEffect(() => {
    getChangeValue(currentValue);
  }, [currentValue]);

  return (
    <div
      className={cn(
        "bg-background-sub4 text-text-primary flex h-[38px] w-[138px] items-center justify-between rounded-[10px] border px-2 py-5",
        className,
      )}
    >
      <button className="flex h-6 w-6 items-center justify-center" onClick={handleClickDecrease}>
        <RemoveOutlined aria-label="decrease" />
      </button>
      <div className="text-text-sub5 bg-background-sub5 flex h-[31px] w-[55px] items-center justify-center rounded-[5px]">
        {currentValue}
      </div>
      <button className="flex h-6 w-6 items-center justify-center" onClick={handleClickIncrease}>
        <AddOutlined aria-label="increase" />
      </button>
    </div>
  );
}

export default Stepper;
