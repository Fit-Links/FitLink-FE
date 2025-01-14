import { useContext } from "react";

import DayOfWeekPickerContext from "../components/DayOfWeekPicker/Context";

export const useDayOfWeekPickerContext = () => {
  const context = useContext(DayOfWeekPickerContext);

  if (!context) {
    throw new Error(
      "useDayOfWeekPickerContext has to be used within <DayOfWeekPickerContext.Provider",
    );
  }

  return context;
};

export default useDayOfWeekPickerContext;
