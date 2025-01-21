import { X } from "lucide-react";
import { ChangeEvent, ComponentProps, forwardRef, HTMLAttributes } from "react";

import useControllableState from "../../hooks/useControllableState";
import useInputWithIconContext from "../../hooks/useInputWithIconContext";
import { cn } from "../../lib/utils";
import { Input } from "../Input";
import { Label } from "../Label";
import InputWithIconContext from "./context";

type InputWithIconProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
};
type InputIconProps = HTMLAttributes<HTMLLabelElement>;
type InputFiledProps = ComponentProps<"input"> & {
  value?: string | number;
  defaultValue?: string | number;
  onChangeValue?: (value: string | number) => void;
};

const InputWithIcon = forwardRef<HTMLDivElement, InputWithIconProps>(
  ({ children, className, id, ...props }, ref) => {
    return (
      <InputWithIconContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn("relative flex w-full items-center p-1", className)}
          {...props}
        >
          {children}
        </div>
      </InputWithIconContext.Provider>
    );
  },
);

InputWithIcon.displayName = "InputWithIcon";

const InputIcon = forwardRef<HTMLLabelElement, InputIconProps>(
  ({ children, className, ...props }, ref) => {
    const { id } = useInputWithIconContext();

    return (
      <Label
        htmlFor={id}
        className={cn("absolute left-3 flex items-center justify-center", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Label>
    );
  },
);

InputIcon.displayName = "InputIcon";

const InputField = forwardRef<HTMLInputElement, InputFiledProps>(
  ({ className, value, defaultValue = "", onChangeValue, ...props }, ref) => {
    const { id } = useInputWithIconContext();

    const [content, setContent] = useControllableState({
      prop: value,
      onChange: onChangeValue,
      defaultProp: defaultValue,
    });

    const handleChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
      setContent(event.target.value);
    };

    const handleClickButton = () => {
      setContent("");
    };

    return (
      <>
        <Input
          id={id}
          ref={ref}
          className={cn("bg-background-sub2 flex-1 px-9", className)}
          placeholder="검색어를 입력하세요"
          value={content}
          onChange={handleChangeContent}
          {...props}
        />
        {content && (
          <button
            onClick={handleClickButton}
            aria-label="초기화 버튼"
            className="bg-background-sub3 absolute right-[3.125rem] flex h-5 w-5 items-center justify-center rounded-full"
          >
            <X size={16} className="text-background-sub4" />
          </button>
        )}
        {content && (
          <button onClick={handleClickButton} className="text-text-primary ml-2">
            취소
          </button>
        )}
      </>
    );
  },
);

InputField.displayName = "InputField";

export { InputWithIcon, InputIcon, InputField };
