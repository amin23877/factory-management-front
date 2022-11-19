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
import { notificationType, toggleSeenNotification } from "api/notification";

export default function NotificationMenu({
  open,
  anchorEl,
  onClose,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  // const { data: notifications, mutate } =
  //   useSWR<{ result: notificationType[]; total: number }>("/notification?unseen=true");

  // const handleSeen = async (id: string) => {
  //   try {
  //     await toggleSeenNotification(id);
  //     mutate();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Popover
      id="notification-menu"
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
        {/* {!notifications && <LinearProgress />}
        <List>
          {notifications &&
            notifications.result.slice(0, 4).map((n, i) => (
              <ListItem key={i}>
                <ListItemText primary={n.title} secondary={n.type === "Engineering Approval" && n?.data?.ItemId} />
                <ListItemSecondaryAction>
                  <IconButton size="small" onClick={() => handleSeen(n.id)}>
                    <CheckRounded />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List> */}
        <Link to="/panel/notification">
          <Button variant="outlined" fullWidth>
            See More
          </Button>
        </Link>
      </Box>
    </Popover>
  );
}
