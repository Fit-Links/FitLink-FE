import { Gender } from "@5unwan/core/api/types/common";
import React from "react";
import { z } from "zod";

import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import {
  InputWithLabel,
  InputLabel,
  InputField,
  ResidentNumberInput,
} from "@ui/components/InputWithLabel";
import ProfileImagePicker from "@ui/components/ProfileImagePicker";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";

import { formatDateStringFromResidentId } from "@ui/utils/formatDateStringFromResidentId";

const NAME_REGEX = /[a-zA-Z가-힣]+$/;
const REQUIRED_FIELDS = Object.freeze({
  profileUrl: true,
  name: true,
  gender: true,
  birthDate: true,
});

type BasicInfoForm = {
  profileUrl?: string;
  name?: string;
  gender?: Gender;
  birthDate?: string;
};

const formSchema = z.object({
  profileUrl: z.string(),
  name: z.string().regex(NAME_REGEX),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string().date(),
});

const parseMessageFromZodError = <K extends keyof BasicInfoForm>(
  key: K,
  errors: zodErrors["fieldErrors"],
) => (errors[key] ? errors[key][0] : undefined);

const validateForm = (formData: BasicInfoForm) => {
  const result = formSchema.safeParse(formData);
  const { success, error } = result;

  return {
    success,
    errors: error?.flatten(),
  };
};
const areRequiredFormFiledsFilled = (
  form: BasicInfoForm,
  required: Record<keyof BasicInfoForm, boolean>,
) => {
  return Object.entries(required)
    .filter(([, isRequired]) => isRequired)
    .every(([key]) => !!form[key as keyof BasicInfoForm]);
};
type zodErrors = z.inferFlattenedErrors<typeof formSchema>;
type BasicInfoStepProps = {
  onNext: (name: string, birthDate: string, gender: Gender, profileUrl: string) => void;
};

function BasicInfoStep({ onNext }: BasicInfoStepProps) {
  const formDataRef = React.useRef<{
    profileUrl?: string;
    name?: string;
    gender?: Gender;
    birthDate?: string;
  }>({});
  const submitRef = React.useRef<HTMLButtonElement>(null);

  const [errors, setErrors] = React.useState<zodErrors["fieldErrors"]>({});

  const updateSubmitDisability = React.useCallback(() => {
    if (!submitRef.current) return;

    submitRef.current.disabled = !areRequiredFormFiledsFilled(formDataRef.current, REQUIRED_FIELDS);
  }, []);

  const resetErrorField = <K extends keyof BasicInfoForm>(key: K) => {
    if (errors[key]) {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    }
  };

  const handleFieldChange = <K extends keyof BasicInfoForm>(key: K, value: BasicInfoForm[K]) => {
    formDataRef.current[key] = value;

    updateSubmitDisability();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const { name, birthDate, gender, profileUrl } = formDataRef.current;

    const { success, errors } = validateForm({
      ...formDataRef.current,
      birthDate: formatDateStringFromResidentId(birthDate),
    });
    if (!success && errors) {
      setErrors(errors.fieldErrors);

      return;
    }
    onNext(name!, formatDateStringFromResidentId(birthDate)!, gender!, profileUrl!);
  };

  React.useEffect(() => {
    updateSubmitDisability();
  }, [updateSubmitDisability]);

  return (
    <div className="flex h-full flex-col">
      <Header>
        <Header.Title content="내 정보" />
      </Header>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between pt-[15px]">
        <div>
          <ProfileImagePicker
            onFileChange={(fileUrl) => {
              resetErrorField("profileUrl");
              handleFieldChange("profileUrl", fileUrl);
            }}
            error={parseMessageFromZodError("profileUrl", errors)}
          />
          <InputWithLabel id="a" error={parseMessageFromZodError("name", errors)}>
            <InputLabel>이름</InputLabel>
            <InputField
              name="name"
              onChange={(e) => {
                resetErrorField("name");
                handleFieldChange("name", e.target.value);
              }}
            />
          </InputWithLabel>
          <InputWithLabel
            id="b"
            className="h-fit"
            error={parseMessageFromZodError("gender", errors)}
          >
            <InputLabel>성별</InputLabel>
            <ToggleGroup
              type="single"
              variant="negative"
              onValueChange={(value) => {
                resetErrorField("gender");
                handleFieldChange("gender", value as Gender);
              }}
            >
              <ToggleGroupItem value="MALE" className="h-[3.375rem] w-full rounded-lg">
                남자
              </ToggleGroupItem>
              <ToggleGroupItem value="FEMALE" className="h-[3.375rem] w-full rounded-lg">
                여자
              </ToggleGroupItem>
            </ToggleGroup>
          </InputWithLabel>
          <InputWithLabel id="c" error={parseMessageFromZodError("birthDate", errors)}>
            <InputLabel>주민등록번호 앞 7자리</InputLabel>
            <ResidentNumberInput
              name="birthDate"
              onChangeValue={(value) => {
                resetErrorField("birthDate");
                handleFieldChange("birthDate", value);
              }}
            />
          </InputWithLabel>
        </div>
        <Button type="submit" className="w-full" size="xl" ref={submitRef}>
          다음
        </Button>
      </form>
    </div>
  );
}

export default BasicInfoStep;
