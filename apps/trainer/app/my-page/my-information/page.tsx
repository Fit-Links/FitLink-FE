import MyInformationContainer from "./_components/MyInformationContainer";

function page() {
  return (
    <main className="bg-background-primary text-text-primary flex h-screen w-full flex-col items-center px-4">
      <MyInformationContainer />
    </main>
  );
}

export default page;
