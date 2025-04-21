"use client";

import HeaderInfo from "@ui/components/Header";
import { useRouter } from "next/navigation";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <HeaderInfo className="box-content">
      <HeaderInfo.Back onClick={handleClickBack} />
      <HeaderInfo.Title content={title} />
    </HeaderInfo>
  );
}
