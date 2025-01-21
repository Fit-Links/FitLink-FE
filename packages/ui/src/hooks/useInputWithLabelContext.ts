import { useContext } from "react";

import InputWithLabelContext from "../components/InputWithLabel/context";

const useInputWithLabelContext = () => {
  const context = useContext(InputWithLabelContext);

  if (!context) {
    throw new Error(`InputWithLabel Components must be used within a InputWithLabel component`);
  }

  return context;
};

export default useInputWithLabelContext;
