import React from "react";
import QRCode from "qrcode.react";

export default function MyQRCode({ value }: { value: string }) {
  return <QRCode value={value} />;
}
