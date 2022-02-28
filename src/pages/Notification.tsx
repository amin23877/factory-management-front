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
import { Link } from "react-router-dom";

function getNotificationBody(notification: notificationType) {
  switch (notification.type) {
    case "Engineering Approval":
      return `${notification.body} ${
        Object.keys(notification?.data).length > 0 ? `- Item Number:${notification?.data?.no}` : ""
      }`;
    case "Purchasing Required":
      return `${notification.body} ${
        Object.keys(notification?.data).length > 0 ? `- Item Number:${notification?.data?.no}` : ""
      }`;
    default:
      return "";
  }
}

function getNotificationLink(notification: notificationType) {
  if (notification.type === "Engineering Approval" && notification?.data?.id) {
    return `/panel/inventory/${notification?.data?.id}`;
  } else if (notification.type === "Purchasing Required") {
    return `/panel/purchase`;
  }

  return null;
}

function getNotificationDate(notification: notificationType) {
  const date = new Date(notification.createdAt);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
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
                    secondary={getNotificationDate(notification) + " / " + getNotificationBody(notification)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" style={{ marginRight: "2em" }}>
                      <DeleteRounded />
                    </IconButton>
                    {getNotificationLink(notification) && (
                      <Link to={getNotificationLink(notification) as string}>
                        <IconButton edge="end" aria-label="go forward">
                          <ArrowForwardRounded />
                        </IconButton>
                      </Link>
                    )}
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
