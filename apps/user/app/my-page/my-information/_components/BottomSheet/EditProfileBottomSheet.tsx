import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { useRef } from "react";

import { MyInformationDetailApiResponse } from "@user/services/types/myInformation.dto";

import SheetItem from "@user/components/SheetItem";

interface EditProfileBottomSheetProps {
  children: React.ReactNode;
  onChangeMyInformation: (key: keyof MyInformationDetailApiResponse["data"], value: string) => void;
}

export default function EditProfileBottomSheet({
  children,
  onChangeMyInformation,
}: EditProfileBottomSheetProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOpenAlbum = () => {
    inputRef.current?.click();
  };

  const handleClickDeleteProfileImage = () => {
    onChangeMyInformation("profilePictureUrl", "");
  };

  const handleChangeProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const uri = URL.createObjectURL(file as Blob);
    onChangeMyInformation("profilePictureUrl", uri);
  };

  return (
    <>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChangeProfileImage}
      />
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side={"bottom"}>
          <SheetTitle></SheetTitle>
          <SheetDescription className="flex flex-col gap-[0.625rem]">
            <SheetClose asChild>
              <SheetItem icon="Image" label="앨범에서 선택" onClick={handleClickOpenAlbum} />
            </SheetClose>
            <SheetClose asChild>
              <SheetItem
                icon="Trash2"
                label="프로필 사진 삭제"
                variant="danger"
                onClick={handleClickDeleteProfileImage}
              />
            </SheetClose>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}
