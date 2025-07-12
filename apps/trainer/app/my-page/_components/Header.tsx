"use client";

import HeaderInfo from "@ui/components/Header";
import { useRouter } from "next/navigation";

import Logo from "@trainer/components/Logo";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  return (
    <HeaderInfo logo={<Logo />} className="box-content">
      <HeaderInfo.Back onClick={handleClickBack} />
      <HeaderInfo.Title content={title} />
    </HeaderInfo>
  );
}
