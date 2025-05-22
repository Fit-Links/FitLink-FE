import MyPageContainer from "./_components/MyPageContainer";

export default async function page() {
  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <MyPageContainer />
    </main>
  );
}
