import { useContext } from "react";

import InputWithLabelContext from "../components/InputWithLabel/context";

const useInputWithLabelContext = (componentName: string) => {
  const context = useContext(InputWithLabelContext);

  if (!context) {
    throw new Error(`${componentName} must be used within a InputWithLabel component`);
  }

  return context;
};

export default useInputWithLabelContext;
