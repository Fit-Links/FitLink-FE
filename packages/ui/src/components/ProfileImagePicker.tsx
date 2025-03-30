import React from "react";

import { cn } from "@ui/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Button } from "./Button";

type ProfileImagePickerProps = {
  onFileChange: (fileUrl: string) => void;
  error?: string | boolean;
};

function ProfileImagePicker({ onFileChange, error }: ProfileImagePickerProps) {
  const [imageUrl, setImageUrl] = React.useState<string>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageFinderClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files;
    if (files && files.length) {
      const newUrl = URL.createObjectURL(files[0]);
      onFileChange(newUrl);
      setImageUrl(newUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 pb-4">
      <Avatar
        className={cn("border-background-sub3 h-[6.25rem] w-[6.25rem] border-2", {
          "border-notification border-2": error,
        })}
      >
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="bg-background-sub3 text-white" />
      </Avatar>
      <Button
        type="button"
        variant="brand"
        corners="pill"
        size="sm"
        onClick={handleImageFinderClick}
      >
        프로필 사진 등록
      </Button>
      <input
        id="profileImage"
        name="profileUrl"
        type="file"
        accept="image/*"
        className="peer hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ProfileImagePicker;
