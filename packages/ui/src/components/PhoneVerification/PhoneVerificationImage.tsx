import Image from "next/image";

import verifyPhone from "@ui/assets/verify-phone.avif";

export default function PhoneVerificationImage() {
  return <Image className="mt-[2.5rem] px-[0.125rem]" src={verifyPhone} alt="verify-phone" />;
}
