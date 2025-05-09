import { ResponseBase } from "@5unwan/core/api/types/common";

export type CreatePresignedUrlRequestBody = {
  fileName: string;
  contentLength: string;
  contentType: string;
};
export type CreatePresignedUrlApiResponse = ResponseBase<{
  presignedUrl: string;
  attachmentId: number;
}>;
export type RegisterUserProfileImageRequestBody = {
  attachmentId: number;
};
export type RegisterUserProfileImageApiResponse = ResponseBase<null>;
