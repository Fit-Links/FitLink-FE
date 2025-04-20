type PhoneVerificationProps = {
  children: React.ReactNode;
};

export default function PhoneVerification({ children }: PhoneVerificationProps) {
  return <section className="flex h-full w-full flex-col">{children}</section>;
}
