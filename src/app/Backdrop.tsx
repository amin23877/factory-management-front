import { Backdrop, CircularProgress } from "@material-ui/core";
import React from "react";

export default function MyBackdrop({ open, handleClose }: { open?: boolean; handleClose?: () => void }) {
    return (
        <Backdrop style={{ color: "white" }} open={open ? open : true} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
