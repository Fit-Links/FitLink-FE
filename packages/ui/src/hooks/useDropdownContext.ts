import { useContext } from "react";

import DropdownContext from "../components/Dropdown/context";

const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(`Dropdown Components must be used within a <Dropdown> component.`);
  }

  return context;
};

export default useDropdownContext;
