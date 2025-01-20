import { useContext } from "react";

import DayOfWeekPickerContext from "../components/DayOfWeekPicker/Context";

export const useDayOfWeekPickerContext = () => {
  const context = useContext(DayOfWeekPickerContext);

  if (!context) {
    throw new Error(
      "DayofWeekPicker components must be used within a <DayofWeekPicker> component.",
    );
  }

  return context;
};

export default useDayOfWeekPickerContext;
