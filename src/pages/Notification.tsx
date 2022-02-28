import React from "react";
import {
  ListItemSecondaryAction,
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import { ArrowForwardRounded, DeleteRounded, FolderRounded } from "@material-ui/icons";
import useSWR from "swr";

import { notificationType } from "api/notification";

function getNotificationBody(notification: notificationType) {
  switch (notification.type) {
    case "Engineering Approval":
      return `${notification.body} ${
        notification?.data && notification?.data?.ItemId ? `- Item Number:${notification?.data?.ItemId}` : ""
      }`;
    default:
      return "";
  }
}

export default function Notification() {
  const { data: notifications } = useSWR<{ result: notificationType[]; total: number }>("/notification");

  return (
    <Container>
      <Typography variant="h5">Notifications</Typography>
      <Box mt={2}>
        <Paper>
          <Box>
            <List>
              {notifications?.result.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderRounded />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${notification.type} - ${notification.title}`}
                    secondary={getNotificationBody(notification)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteRounded />
                    </IconButton>
                    <IconButton edge="end" aria-label="go forward">
                      <ArrowForwardRounded />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
