import React from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Popover,
} from "@material-ui/core";
import useSWR from "swr";
import { CheckRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";

import Button from "app/Button";
import { notificationType } from "api/notification";

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
            notifications.result.slice(0, 6).map((n, i) => (
              <ListItem key={i}>
                <ListItemText primary={n.title} secondary={n.type === "Engineering Approval" && n.data.ItemId} />
                <ListItemSecondaryAction>
                  <IconButton size="small">
                    <CheckRounded />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Link to="/panel/notification">
          <Button variant="outlined" fullWidth>
            See More
          </Button>
        </Link>
      </Box>
    </Popover>
  );
}
