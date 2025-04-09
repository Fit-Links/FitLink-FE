import Calendar from "./_components/Calendar";
import ReservationAdder from "./_components/ReservationAdder";

function ScheduleManagement() {
  /** TODO: 트레이너 연동 인증 로직으로 구현 */

  return (
    <main className="relative flex h-full w-full justify-center overflow-y-auto">
      {/* <Link href={"http://3.34.169.105/oauth2/authorization/kakao"}>카카오 로그인</Link> */}
      <Calendar />
      <ReservationAdder trainerConnectStatus="CONNECTED" ptCount={1} />
    </main>
  );
}

export default ScheduleManagement;
