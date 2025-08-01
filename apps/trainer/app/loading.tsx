import Image from "next/image";

function Loading() {
  return (
    <div className="bg-background-sub2 fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center opacity-70">
      <div className="flex h-[150px] w-[150px] animate-[bounce_1.5s_ease-in-out_infinite] items-center justify-center rounded-full ease-in-out">
        <Image className="" width="100" height="100" alt="로딩중..." src={"/icon512_rounded.png"} />
      </div>
    </div>
  );
}

export default Loading;
