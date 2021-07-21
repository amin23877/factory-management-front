import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import UnderDev from "../app/UnderDevelopment";
import { Button, Dialog } from "@material-ui/core";
import { toast } from "react-toastify";

export default function Settings() {
    const [open, setOpen] = useState(false);

    return (
        <Container>
            <Button onClick={() => setOpen(true)}>open</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Button onClick={() => toast.error("asd")}>toast</Button>
            </Dialog>

            <UnderDev />
        </Container>
    );
}
