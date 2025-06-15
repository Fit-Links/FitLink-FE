import { useMutation } from "@tanstack/react-query";

import { createPresignedUrl, uploadImage } from "@trainer/services/attachment";

export const useUploadProfileImage = () => {
  const createPresignedUrlMutation = useMutation({
    mutationFn: createPresignedUrl,
  });
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  const uploadProfileImage = async (imageFile: File) => {
    try {
      const {
        data: { presignedUrl, attachmentId },
        status: createPresignedUrlStatus,
        success: createPresignedUrlSuccess,
        msg: createPresignedUrlMsg,
      } = await createPresignedUrlMutation.mutateAsync(
        {
          fileName: imageFile.name,
          contentLength: imageFile.size.toString(),
          contentType: imageFile.type,
        },
        {
          onSuccess: () => {},
        },
      );

      if (!createPresignedUrlSuccess)
        throw new Error(
          `Error occured during createPresignedUrl\nStatus:${createPresignedUrlStatus}\nMessage:${createPresignedUrlMsg}`,
        );

      await uploadImageMutation.mutateAsync({
        presignedUrl,
        imageFile,
      });

      return attachmentId;
    } catch {
      //TODO: 에러 처리 로직 추가
    }
  };

  return { uploadProfileImage };
};
