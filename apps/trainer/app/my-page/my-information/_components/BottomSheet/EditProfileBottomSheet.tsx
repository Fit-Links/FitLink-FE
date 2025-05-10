import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { useRef } from "react";

import SheetItem from "./SheetItem";

interface EditProfileBottomSheetProps {
  children: React.ReactNode;
}

export default function EditProfileBottomSheet({ children }: EditProfileBottomSheetProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOpenAlbum = () => {
    inputRef.current?.click();
  };

  const handleChangeProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // TODO: 프로필 사진 삭제 API 요청
  };

  const handleClickDeleteProfileImage = () => {
    // TODO: 프로필 사진 삭제 API 요청
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
        <SheetContent side={"bottom"} className="md:max-w-mobile left-1/2 w-full -translate-x-1/2">
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
