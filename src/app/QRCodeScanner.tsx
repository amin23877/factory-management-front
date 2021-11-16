import React from "react";
import { Box } from "@material-ui/core";
import QrReader from "react-qr-reader";

import Dialog from "./Dialog";

export default function QRCodeScanner({
  open,
  onClose,
  onScan,
}: {
  open: boolean;
  onClose: () => void;
  onScan: (data: string | null) => void;
}) {
  // const [number, setNumber] = useState<string | null>(null);
  const handleError = (err: any) => {
    console.log(err);
  };

  const handleScan = (data: string | null): void => {
    data && onScan(data);
  };

  return (
    <Dialog
      title="QR Code Scanner"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <Box m={1} display="flex">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </Box>
    </Dialog>
  );
}
