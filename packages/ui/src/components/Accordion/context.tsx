import { createContext, Dispatch, SetStateAction } from "react";

type AccordionContext = {
  iconWidth: number;
  setIconWidth: Dispatch<SetStateAction<number>>;
};

const AccordionContext = createContext<AccordionContext | null>(null);

export default AccordionContext;
