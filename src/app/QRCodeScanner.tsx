import React, { useState } from "react";
import { Box, Typography } from "@material-ui/core";
import QrReader from "react-qr-reader";

import Dialog from "./Dialog";
import Button from "./Button";

export default function QRCodeScanner({
    open,
    onClose,
    onScan,
}: {
    open: boolean;
    onClose: () => void;
    onScan: (data: string | null) => void;
}) {
    const [number, setNumber] = useState<string | null>(null);
    const handleError = (err: any) => {
        console.log(err);
    };

    const handleScan = (data: string | null): void => {
        data && setNumber(data);
    };

    return (
        <Dialog title="QR Code Scanner" open={open} onClose={onClose}>
            <Box m={1} display="grid" gridTemplateRows="3fr 1fr 1fr" gridGap={10}>
                <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
                <Typography>Number: {number}</Typography>
                <Button disabled={!number} kind="add" onClick={() => onScan(number)}>
                    Submit
                </Button>
            </Box>
        </Dialog>
    );
}
