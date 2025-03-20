import { ChangeEvent, ComponentProps, forwardRef, ReactNode } from "react";
import { useState } from "react";

import useInputWithLabelContext from "../../hooks/useInputWithLabelContext";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import InputWithLabelContext from "./context";

const MAX_MASKED_LENGTH = 14;
const MIN_MASKED_LENGTH = 0;

type InputWithLabelProps = ComponentProps<"div"> & {
  error?: boolean | string;
  children: ReactNode;
  id: string;
};
type InputLabelProps = ComponentProps<"label"> & {
  required?: boolean;
};
type InputWithLabelErrorProps = ComponentProps<"div"> & {
  children: ReactNode;
};

const InputWithLabel = forwardRef<HTMLDivElement, InputWithLabelProps>(
  ({ children, className, error, id, ...props }, ref) => {
    const isErrorString = typeof error === "string";

    return (
      <InputWithLabelContext.Provider value={{ id, error }}>
        <div className="flex h-fit flex-col gap-[0.8125rem]">
          <div
            ref={ref}
            className={cn(
              "bg-background-sub2 box-border flex h-[5.0625rem] w-full flex-col gap-2 rounded-[0.625rem] p-3",
              error && "has-error border-notification border",
              className,
            )}
            {...props}
          >
            {children}
          </div>
          {isErrorString ? (
            <InputWithLabelError>{error}</InputWithLabelError>
          ) : (
            <span className="h-[1.125rem]"></span>
          )}
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
      {required && <span className="text-notification ml-0.5">*</span>}
    </label>
  );
}

const InputField = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const { id } = useInputWithLabelContext();

    return (
      <Input
        ref={ref}
        id={id}
        className={cn("text-title-1 h-fit w-full bg-transparent p-0", className)}
        {...props}
      />
    );
  },
);

InputField.displayName = "InputField";

type ResidentNumberInputProps = ComponentProps<"input"> & {
  onChangeValue?: (value: string) => void;
};
const ResidentNumberInput = forwardRef<HTMLInputElement, ResidentNumberInputProps>(
  ({ onChangeValue, ...props }, ref) => {
    const { id } = useInputWithLabelContext();
    const [idNumber, setIdNumber] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9]/g, "");
      const maskedValue = value
        .replace(/(\d{6})(\d{1})(\d{0,6})/, "$1-$2******")
        .slice(MIN_MASKED_LENGTH, MAX_MASKED_LENGTH);

      setIdNumber(maskedValue);
      if (onChangeValue) onChangeValue(value);
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
        className="text-title-1 h-fit w-full bg-transparent p-0 tracking-[0.625rem]"
        {...props}
      />
    );
  },
);

ResidentNumberInput.displayName = "ResidentNumberInput";

function InputWithLabelError({ children, className, ...props }: InputWithLabelErrorProps) {
  const { error } = useInputWithLabelContext();

  if (!children || !error) return null;

  return (
    <div className={cn("text-body-4 text-notification", className)} {...props}>
      {children}
    </div>
  );
}

export { InputWithLabel, InputLabel, InputField, ResidentNumberInput };
