import React, { useRef } from "react";
import { Box, Typography, Button } from "@material-ui/core";

import MyQRCode from "app/QRCode";

import { WebsiteUrl } from "api/config";
import { IUnit } from "api/units";
import { exportPdf } from "logic/pdf";

export default function QRCode({ unit }: { unit: IUnit }) {
  const qrCode = useRef<HTMLElement | null>(null);

  return (
    <Box mt={1} display="flex" justifyContent="space-around" alignItems="center">
      <div ref={(e) => (qrCode.current = e)} style={{ flex: 1 }}>
        <MyQRCode value={`${WebsiteUrl}/servicerequest?serial=${unit?.serial}`} />
        <Typography variant="subtitle1">Unit Number: {unit.number}</Typography>
        <Typography variant="subtitle1">Unit Name: {unit?.name}</Typography>
        <Typography variant="subtitle1">Serial Number: {unit?.serial}</Typography>
      </div>
      <Button
        variant="contained"
        onClick={async () => {
          if (qrCode.current) {
            await exportPdf(qrCode.current);
          }
        }}
      >
        Print
      </Button>
    </Box>
  );
}
