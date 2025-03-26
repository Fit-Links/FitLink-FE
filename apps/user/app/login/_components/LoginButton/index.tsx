import Link from "next/link";

import { BASE_URL } from "@user/constants/url";

const generateLoginURI = (type: string) => `${BASE_URL}/oauth2/authorization/${type}`;

type OAuthTypes = "kakao" | "naver" | "google";

type LoginButtonProps = {
  type: OAuthTypes;
  renderContent: () => React.ReactNode;
};
function LoginButton({ type, renderContent }: LoginButtonProps) {
  return (
    <Link
      href={generateLoginURI(type)}
      className=" h-[3.375rem] w-full overflow-clip rounded-full transition-opacity hover:opacity-80"
    >
      {renderContent()}
    </Link>
  );
}

export default LoginButton;
