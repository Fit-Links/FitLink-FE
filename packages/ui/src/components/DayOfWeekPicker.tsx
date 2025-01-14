import React, { forwardRef, useCallback } from "react";

import useControllableState from "../hooks/useControllableState";
import useDayOfWeekPickerContext from "../hooks/useDayOfWeekPickerContext";
import { cn } from "../lib/utils";
import DayOfWeekPickerContext from "./DayOfWeekPicker/Context";
import { Days } from "./DayOfWeekPicker/Days";

const DayTable = ["월", "화", "수", "목", "금", "토", "일"] as const;

const DAY_OF_WEEK_PICKER_NAME = "DayOfWeekPicker";
const DAY_OF_WEEK_PICKER_ITEM_NAME = "DayOfWeekPickerItem";
const DAY_OF_WEEK_PICKER_IMPL_NAME = "DayOfWeekPickerImpl";
const DAYS_IN_WEEK = 7;

export interface DayOfWeekPickerProps extends React.HTMLAttributes<HTMLDivElement>, WrapperProps {}
type WrapperProps = {
  currentDay?: Days;
  onCurrentDayChange: (value: Days) => void;
  defaultDay?: Days;
  completed?: boolean[];
};

const DayOfWeekPicker = forwardRef<HTMLDivElement, DayOfWeekPickerProps>(
  ({ currentDay, onCurrentDayChange, completed, defaultDay, ...commonProps }, ref) => {
    const [value, setValue] = useControllableState({
      prop: currentDay,
      defaultProp: defaultDay || Days.Monday,
      onChange: onCurrentDayChange,
    });

    return (
      <DayOfWeekPickerContext.Provider
        value={{
          value: value || defaultDay,
          completed: completed || Array.from(Array(DAYS_IN_WEEK), () => false),
          onItemClick: useCallback(setValue, [setValue]),
        }}
      >
        <DayOfWeekPickerImpl ref={ref} {...commonProps} />
      </DayOfWeekPickerContext.Provider>
    );
  },
);

DayOfWeekPicker.displayName = DAY_OF_WEEK_PICKER_NAME;

const DayOfWeekPickerImpl = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...commonProps }, ref) => {
    return (
      <div
        className={cn(
          "text-body-3 text-text-primary inline-flex items-center justify-between gap-[24px] transition-colors",
          className,
        )}
        {...commonProps}
        ref={ref}
      >
        {Array.from(Array(DAYS_IN_WEEK), (_, index) => Number(index)).map((day) => (
          <DayOfWeekPickerItem key={day} day={day}>
            {DayTable[day]}
          </DayOfWeekPickerItem>
        ))}
      </div>
    );
  },
);
DayOfWeekPickerImpl.displayName = DAY_OF_WEEK_PICKER_IMPL_NAME;

export interface DayOfWeekPickerItemProps extends React.HTMLAttributes<HTMLDivElement>, ItemProps {}
type ItemProps = {
  day: Days;
};

const DayOfWeekPickerItem = forwardRef<HTMLDivElement, DayOfWeekPickerItemProps>(
  ({ day, children }, ref) => {
    const context = useDayOfWeekPickerContext();
    const isCurrent = context.value === day;
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      context.onItemClick(day);
    };
    const isCompleted = context.completed[day];

    return (
      <div
        className={cn(
          "hover:bg-brand-primary-600 flex h-[30px] w-[30px] items-center justify-center rounded-full border-none transition-colors duration-150",
          {
            "bg-background-sub3": isCompleted,
          },
          {
            "bg-brand-primary-500": isCurrent,
          },
        )}
        ref={ref}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  },
);
DayOfWeekPickerItem.displayName = DAY_OF_WEEK_PICKER_ITEM_NAME;

export default DayOfWeekPicker;
