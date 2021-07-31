import React from "react";
import MyQRCode from "../../app/QRCode";

export default function QRCode({ number }: { number: string }) {
    return <MyQRCode value={number} />;
}
