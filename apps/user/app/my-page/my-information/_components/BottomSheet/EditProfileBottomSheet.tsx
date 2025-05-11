"use client";

import { useMutation } from "@tanstack/react-query";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { useRef } from "react";

import SheetItem from "@user/components/SheetItem";

interface EditProfileBottomSheetProps {
  children: React.ReactNode;
}

export default function EditProfileBottomSheet({ children }: EditProfileBottomSheetProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOpenAlbum = () => {
    inputRef.current?.click();
  };

  const { mutate } = useMutation({
    // 이미지 없는 경우 여쭤보기
    // 이미지 있는 경우 삭제
  });

  const handleClickDeleteProfileImage = () => {
    // onChangeMyInformation("profilePictureUrl", "");
    mutate();
  };

  const handleChangeProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // const uri = URL.createObjectURL(file as Blob);
    // onChangeMyInformation("profilePictureUrl", uri);
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
