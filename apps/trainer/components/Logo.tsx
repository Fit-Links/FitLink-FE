import Image from "next/image";

function Logo() {
  return <Image width={80} height={30} src={"/logo_colored.png"} alt="Fitlink" priority />;
}

export default Logo;
