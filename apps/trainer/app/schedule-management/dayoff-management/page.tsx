import DayoffCalendarContainer from "./_components/DayoffCalendarContainer";
import Header from "./_components/Header";

function DayoffManagement() {
  return (
    <main className="flex h-full flex-col">
      <Header />
      <DayoffCalendarContainer />
    </main>
  );
}

export default DayoffManagement;
