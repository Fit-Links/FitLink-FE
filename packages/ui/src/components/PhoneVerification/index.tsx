"use client";

import PhoneVerificationButton from "./PhoneVerificationButton";
import PhoneVerificationGuide from "./PhoneVerificationGuide";
import PhoneVerificationImage from "./PhoneVerificationImage";
import PhoneVerificationNotice from "./PhoneVerificationNotice";

export default function PhoneVerification() {
  return (
    <main className="flex h-full w-full flex-col">
      <PhoneVerificationGuide />
      <PhoneVerificationImage />
      <PhoneVerificationNotice />
      <PhoneVerificationButton />
    </main>
  );
}
