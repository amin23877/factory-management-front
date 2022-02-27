import React, { useEffect, useState } from "react";
import { Badge, IconButton } from "@material-ui/core";
import { NotificationsOutlined } from "@material-ui/icons";

import NotificationMenu from "./Menu";
import { useSocket } from "logic/Socket/Provider";

export default function NotificationButton() {
  const [showDot, setShowDot] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { notification } = useSocket();

  useEffect(() => {
    notification?.onNotification((n) => {
      setShowDot(true);
    });
  }, [notification]);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowDot(false);
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <IconButton size="small" title="Notifications" color="inherit" onClick={handleOpenMenu}>
        <Badge variant="dot" color="error" invisible={!showDot}>
          <NotificationsOutlined style={{ marginRight: 3 }} />
        </Badge>
      </IconButton>
      <NotificationMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
    </>
  );
}
