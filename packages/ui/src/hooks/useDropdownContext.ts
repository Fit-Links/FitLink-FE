import { useContext } from "react";

import DropdownContext from "../components/Dropdown/context";

const useDropdownContext = (componentName: string) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(`${componentName} must be used within a <Dropdown> component.`);
  }

  return context;
};

export default useDropdownContext;
