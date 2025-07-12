import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center">
      <Image width={80} height={30} src={"/logo_colored.png"} alt="Fitlink" />
    </div>
  );
}

export default Logo;
