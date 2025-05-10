"use client";

import HeaderInfo from "@ui/components/Header";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <HeaderInfo className="min-h-[2.188rem]">
      <HeaderInfo.Left>
        <HeaderInfo.Back onClick={handleClickBack} />
      </HeaderInfo.Left>
      <HeaderInfo.Title content={title} />
    </HeaderInfo>
  );
}
