import React, { useState } from "react";
import { Box, IconButton } from "@material-ui/core";
import { PersonRounded } from "@material-ui/icons";

import ProfileMenu from "./Menu";
import { useSelector } from "react-redux";
import { selectSession } from "features/Session/sessionsSlice";

export default function NotificationButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const session = useSelector(selectSession);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <Box display={"flex"} alignItems="center" mr={3} style={{ cursor: "pointer" }}>
      <IconButton size="small" title="Notifications" color="inherit" onClick={handleOpenMenu}>
        <PersonRounded />
      </IconButton>
      <span onClick={handleOpenMenu}>{session?.session?.username}</span>
      <ProfileMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
    </Box>
  );
}
