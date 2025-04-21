import { Button } from "@ui/components/Button";
import React from "react";

import { MyInformationApiResponse } from "@trainer/services/types/myInformation.dto";

import EditProfileBottomSheet from "./BottomSheet/EditProfileBottomSheet";

type EditProfileButtonProps = {
  profileUrl: string;
  onChangeMyInformation: (key: keyof MyInformationApiResponse["data"], value: string) => void;
};

function EditProfileButton({ profileUrl, onChangeMyInformation }: EditProfileButtonProps) {
  return (
    <EditProfileBottomSheet onChangeMyInformation={onChangeMyInformation}>
      <Button className="mt-[1.25rem]" variant={"brand"} size={"sm"} corners={"pill"}>
        {profileUrl ? "프로필 사진 수정" : "프로필 사진 등록"}
      </Button>
    </EditProfileBottomSheet>
  );
}

export default EditProfileButton;
