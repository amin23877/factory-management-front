import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import QrReader from "react-qr-reader";

import CropFreeRounded from "@material-ui/icons/CropFreeRounded";

export default function UPCToggle() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" title="UPC" onClick={handleClick}>
        <CropFreeRounded style={{ marginRight: 3 }} />
      </IconButton>
      <Menu
        id="QR Scanner"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ width: 400, height: 400 }}>
          <QrReader onError={() => {}} onScan={() => {}} />
        </div>
      </Menu>
    </>
  );
}
