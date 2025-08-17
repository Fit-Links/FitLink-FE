import { createContext, Dispatch } from "react";

import { Days } from "./Days";

type DayOfWeekPickerContext = {
  value?: Days;
  completed: boolean[];
  onItemClick: Dispatch<React.SetStateAction<Days | undefined>>;
  disabledDays?: Days[];
  errorDays?: boolean[];
};

const DayOfWeekPickerContext = createContext<DayOfWeekPickerContext | null>(null);

export default DayOfWeekPickerContext;
