import axios from "axios";

import http from "@trainer/app/apiCore";

import {
  CreatePresignedUrlApiResponse,
  CreatePresignedUrlRequestBody,
  RegisterUserProfileImageApiResponse,
  RegisterUserProfileImageRequestBody,
} from "./types/attachment.dto";

export const createPresignedUrl = (data: CreatePresignedUrlRequestBody) =>
  http.post<CreatePresignedUrlApiResponse>({
    url: "/v1/attachments/pre-signed-url",
    data,
  });

export const uploadImage = ({
  presignedUrl,
  imageFile,
}: {
  presignedUrl: string;
  imageFile: File;
}) =>
  axios.put(presignedUrl, imageFile, {
    headers: {
      "Content-Type": imageFile.type,
    },
  });

export const registerUserProfileImage = (data: RegisterUserProfileImageRequestBody) =>
  http.post<RegisterUserProfileImageApiResponse>({
    url: "/v1/attachments/user-profile",
    data,
  });
