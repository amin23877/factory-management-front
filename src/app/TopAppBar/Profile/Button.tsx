import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import { PersonRounded } from "@material-ui/icons";

import ProfileMenu from "./Menu";

export default function NotificationButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <IconButton size="small" title="Notifications" color="inherit" onClick={handleOpenMenu}>
        <PersonRounded style={{ marginRight: 3 }} />
      </IconButton>
      <ProfileMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
    </>
  );
}
