"use client";

import Header from "@ui/components/Header";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import Logo from "../Logo";

type HeaderProviderProps = {
  children: ReactNode;
  title?: string;
  left?: ReactNode;
  right?: ReactNode;
  back?: boolean;
  subHeader?: ReactNode;
};
function HeaderProvider({
  children,
  title,
  left,
  right,
  subHeader,
  back = false,
}: HeaderProviderProps) {
  const router = useRouter();

  return (
    <>
      <Header logo={<Logo />} subHeader={subHeader}>
        {back && <Header.Back onClick={router.back} />}
        {left && !back && <Header.Left>{left}</Header.Left>}
        {title && <Header.Title content={title} />}
        {right && <Header.Right>{right}</Header.Right>}
      </Header>
      {children}
    </>
  );
}

export default HeaderProvider;
