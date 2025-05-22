import ProfileCardFallback from "./ProfileCardFallback";

function ProfileCardListFallback() {
  return (
    <ul className="flex flex-1 flex-col gap-3">
      {Array.from({ length: 5 }).map(() => (
        <ProfileCardFallback />
      ))}
    </ul>
  );
}

export default ProfileCardListFallback;
