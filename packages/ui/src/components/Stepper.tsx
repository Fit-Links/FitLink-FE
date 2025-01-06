"use client";

import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { cn } from "../lib/utils";

type StepperProps = {
  defaultValue?: number;
  value?: number;
  step?: number;
  onChangeValue: (value: number) => void;
  className?: string;
};

const DEFAULT_VALUE = 0;
const DEFAULT_STEP = 1;

function Stepper({
  defaultValue = DEFAULT_VALUE,
  value,
  step = DEFAULT_STEP,
  onChangeValue,
  className,
}: StepperProps) {
  const [internalValue, setInternalValue] = useControllableState({
    prop: value,
    onChange: onChangeValue,
    defaultProp: defaultValue,
  });

  const handleClickDecrease = () => {
    setInternalValue((internalValue ?? DEFAULT_VALUE) - step);
  };

  const handleClickIncrease = () => {
    setInternalValue((internalValue ?? DEFAULT_VALUE) + step);
  };

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
        {internalValue}
      </div>
      <button className="flex h-6 w-6 items-center justify-center" onClick={handleClickIncrease}>
        <AddOutlined aria-label="increase" />
      </button>
    </div>
  );
}

export default Stepper;
