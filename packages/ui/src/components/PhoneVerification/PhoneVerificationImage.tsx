import verifyPhone from "@ui/assets/verify-phone.avif";

export default function PhoneVerificationImage() {
  return (
    <div className="flex items-center justify-center">
      <img
        className="mt-[2.5rem] px-[0.125rem]"
        src={verifyPhone.src}
        alt="verify-phone"
        width="280px"
        height="auto"
      />
    </div>
  );
}
