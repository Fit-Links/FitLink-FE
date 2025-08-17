import { useContext } from "react";

import AccordionContext from "../components/Accordion/context";

const useAccordionContext = (componentName: string) => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`${componentName} must be used within a <Dropdown> component.`);
  }

  return context;
};

export default useAccordionContext;
