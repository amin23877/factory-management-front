import React from "react";

import Dialog from "../../../../app/Dialog";
import RequestedQuotes from "./index";
export default function ReqQuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
        <Dialog onClose={onClose} closeOnClickOut={false} open={open} title="Requested Quotes" fullScreen>
            <RequestedQuotes />
        </Dialog>
    );
}
