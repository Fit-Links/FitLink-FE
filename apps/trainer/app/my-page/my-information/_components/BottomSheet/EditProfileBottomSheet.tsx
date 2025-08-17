import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@ui/components/Sheet";
import { VisuallyHidden } from "@ui/components/VisuallyHidden";
import { useRef } from "react";

import { myInformationQueries } from "@trainer/queries/myInformation";

import {
  createPresignedUrl,
  registerUserProfileImage,
  uploadImage,
} from "@trainer/services/attachment";

import SheetItem from "./SheetItem";

interface EditProfileBottomSheetProps {
  children: React.ReactNode;
}

// const DELETE_PROFILE_IMAGE_ATTACHMENT_ID = -1;

export default function EditProfileBottomSheet({ children }: EditProfileBottomSheetProps) {
  const queryClient = useQueryClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOpenAlbum = () => {
    inputRef.current?.click();
  };

  const createPresignedUrlMutation = useMutation({
    mutationFn: createPresignedUrl,
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  const registerUserProfileImageMutation = useMutation({
    mutationFn: registerUserProfileImage,
  });

  const handleChangeProfileImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const imageFile = event.target.files?.[0];

      if (!imageFile) return;

      const {
        data: { presignedUrl, attachmentId },
        status: createPresignedUrlStatus,
        success: createPresignedUrlSuccess,
        msg: createPresignedUrlMsg,
      } = await createPresignedUrlMutation.mutateAsync({
        fileName: imageFile.name,
        contentLength: imageFile.size.toString(),
        contentType: imageFile.type,
      });

      if (!createPresignedUrlSuccess)
        throw new Error(
          `Error occured during createPresignedUrl\nStatus:${createPresignedUrlStatus}\nMessage:${createPresignedUrlMsg}`,
        );

      await uploadImageMutation.mutateAsync({
        presignedUrl,
        imageFile,
      });

      const {
        status: registerUserProfileImageStatus,
        success: registerUserProfileImageSuccess,
        msg: registerUserProfileImageMsg,
      } = await registerUserProfileImageMutation.mutateAsync({
        attachmentId,
      });
      queryClient.invalidateQueries({ queryKey: myInformationQueries.myInformation().queryKey });

      if (!registerUserProfileImageSuccess)
        throw new Error(
          `Error occured during createPresignedUrl\nStatus:${registerUserProfileImageStatus}\nMessage:${registerUserProfileImageMsg}`,
        );

      return attachmentId;
    } catch (error) {
      // 오류 처리
      console.log(error);
    }
  };

  // const handleClickDeleteProfileImage = async () => {
  //   const {
  //     status: registerUserProfileImageStatus,
  //     success: registerUserProfileImageSuccess,
  //     msg: registerUserProfileImageMsg,
  //   } = await registerUserProfileImageMutation.mutateAsync({
  //     attachmentId: DELETE_PROFILE_IMAGE_ATTACHMENT_ID,
  //   });
  //   queryClient.invalidateQueries({ queryKey: myInformationQueries.myInformation().queryKey });

  //   if (!registerUserProfileImageSuccess)
  //     throw new Error(
  //       `Error occured during createPresignedUrl\nStatus:${registerUserProfileImageStatus}\nMessage:${registerUserProfileImageMsg}`,
  //     );
  // };

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
        <SheetContent side={"bottom"} className="md:w-mobile md:inset-x-[calc((100%-30rem)/2)]">
          <VisuallyHidden>
            <SheetTitle>프로필 사진 변경</SheetTitle>
            <SheetDescription>
              이 시트에서는 사용자 프로필 사진을 변경할 수 있습니다.
            </SheetDescription>
          </VisuallyHidden>
          <SheetClose asChild>
            <SheetItem icon="Image" label="앨범에서 선택" onClick={handleClickOpenAlbum} />
          </SheetClose>
          {/* <SheetClose asChild>
              <SheetItem
                icon="Trash2"
                label="프로필 사진 삭제"
                variant="danger"
                onClick={handleClickDeleteProfileImage}
              />
            </SheetClose> */}
        </SheetContent>
      </Sheet>
    </>
  );
}
