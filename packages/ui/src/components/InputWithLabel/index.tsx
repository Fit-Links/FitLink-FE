import { ChangeEvent, ComponentProps, forwardRef, ReactNode } from "react";
import { useState } from "react";

import useInputWithLabelContext from "../../hooks/useInputWithLabelContext";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import InputWithLabelContext from "./context";

const MAX_MASKED_LENGTH = 14;
const MIN_MASKED_LENGTH = 0;

type InputWithLabelProps = ComponentProps<"div"> & {
  error?: boolean;
  children: ReactNode;
  id: string;
};
type InputLabelProps = ComponentProps<"label"> & {
  required?: boolean;
};
type InputFieldProps = ComponentProps<"input"> & {
  error?: boolean;
};
type InputWithLabelErrorProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const InputWithLabel = forwardRef<HTMLDivElement, InputWithLabelProps>(
  ({ children, className, error, id, ...props }, ref) => {
    return (
      <InputWithLabelContext.Provider value={{ id, error }}>
        <div
          ref={ref}
          className={cn("relative flex h-[107px] w-full flex-col rounded-[10px]", className)}
          {...props}
        >
          <div
            className={cn(
              "bg-background-sub2 box-border flex h-[81px] w-full flex-col gap-2 rounded-[10px] p-3",
              error && "has-error border-notification border",
            )}
          >
            {children}
          </div>
        </div>
      </InputWithLabelContext.Provider>
    );
  },
);

InputWithLabel.displayName = "FormField";

function InputLabel({ children, className, required, ...props }: InputLabelProps) {
  const { id } = useInputWithLabelContext();

  return (
    <label htmlFor={id} className={cn("text-text-primary text-body-1", className)} {...props}>
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ className, ...props }, ref) => {
  const { id } = useInputWithLabelContext();

  return (
    <Input
      ref={ref}
      id={id}
      className={cn("text-title-1 h-fit w-full bg-transparent p-0", className)}
      {...props}
    />
  );
});

InputField.displayName = "InputField";

const ResidentNumberInput = forwardRef<HTMLInputElement>((_, ref) => {
  const { id } = useInputWithLabelContext();
  const [idNumber, setIdNumber] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const maskedValue = value
      .replace(/(\d{6})(\d{1})(\d{0,6})/, "$1-$2******")
      .slice(MIN_MASKED_LENGTH, MAX_MASKED_LENGTH);

    setIdNumber(maskedValue);
  };

  return (
    <Input
      id={id}
      ref={ref}
      type="text"
      placeholder="생년월일 - *******"
      maxLength={14}
      value={idNumber}
      onChange={handleChange}
      className="text-title-1 h-fit w-full bg-transparent p-0 tracking-[10px]"
    />
  );
});

ResidentNumberInput.displayName = "ResidentNumberInput";

function InputWithLabelError({ children, className, ...props }: InputWithLabelErrorProps) {
  const { error } = useInputWithLabelContext();

  if (!children || !error) return null;

  return (
    <div className={cn("text-body-4 absolute bottom-0 left-0 text-red-500", className)} {...props}>
      {children}
    </div>
  );
}

export { InputWithLabel, InputLabel, InputField, InputWithLabelError, ResidentNumberInput };
