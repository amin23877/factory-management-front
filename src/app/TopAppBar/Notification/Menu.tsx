import React from "react";
import { Box, LinearProgress, List, ListItem, ListItemText, Popover } from "@material-ui/core";
import { notificationType } from "api/notification";
import useSWR from "swr";

export default function NotificationMenu({
  open,
  anchorEl,
  onClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const { data: notifications } = useSWR<{ result: notificationType[]; total: number }>("/notification");

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box p={1} width={200} height={400} overflow="auto">
        <h1>Notifications</h1>
        {!notifications && <LinearProgress />}
        <List>
          {notifications &&
            notifications.result.map((n, i) => (
              <ListItem key={i}>
                <ListItemText primary={n.title} secondary={n.type === "Engineering Approval" && n.data.ItemId} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Popover>
  );
}
