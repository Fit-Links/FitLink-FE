import { QRCodeSVG } from "qrcode.react";
import React from "react";

type QRCodeGeneratorProps = {
  value: string;
};

function QRCodeGenerator({ value }: QRCodeGeneratorProps) {
  return (
    <div className="">
      <QRCodeSVG value={value} size={200} />
    </div>
  );
}

export default QRCodeGenerator;
