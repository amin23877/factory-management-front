import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import CropFreeRounded from "@material-ui/icons/CropFreeRounded";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router";
import Toast from "../../app/Toast";

export default function UPCToggle() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const history = useHistory();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleScan = (data: string | null): void => {
        console.log(data);

        if (!data) {
            return;
        }
        const { panel, id } = JSON.parse(data);
        history.push(`/panel/${panel}/${id}`);
    };

    return (
        <>
            <IconButton size="small" title="UPC" onClick={handleClick}>
                <CropFreeRounded style={{ marginRight: 3 }} />
            </IconButton>
            <Menu id="QR Scanner" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <div style={{ width: 400, height: 400 }}>
                    {Boolean(anchorEl) && <QrReader onError={(e) => Toast(String(e), "error")} onScan={handleScan} />}
                </div>
            </Menu>
        </>
    );
}
