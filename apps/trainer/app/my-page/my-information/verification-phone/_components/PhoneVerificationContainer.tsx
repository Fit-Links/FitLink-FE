import PhoneVerification from "@ui/components/PhoneVerification";
import { PhoneVerificationButton } from "@ui/components/PhoneVerification/PhoneVerificationButton";
import PhoneVerificationGuide from "@ui/components/PhoneVerification/PhoneVerificationGuide";
import PhoneVerificationImage from "@ui/components/PhoneVerification/PhoneVerificationImage";
import PhoneVerificationNotice from "@ui/components/PhoneVerification/PhoneVerificationNotice";

export default function PhoneVerificationContainer() {
  return (
    <PhoneVerification>
      <PhoneVerificationGuide />
      <PhoneVerificationImage />
      <PhoneVerificationNotice />
      <PhoneVerificationButton />
    </PhoneVerification>
  );
}
