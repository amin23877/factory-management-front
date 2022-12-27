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
import { ArrowForwardRounded, CheckRounded, FolderRounded, FilterListRounded } from "@material-ui/icons";
import { useSWRInfinite } from "swr";
import { Link } from "react-router-dom";

import Button from "app/Button";
import TextField from "app/TextField";
import { notificationType, toggleSeenNotification } from "api/notification";

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
    return `/panel/inventory/items/${notification?.data?.id?.id}`;
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
  // const { data: notifications, mutate } = useSWR<{ result: notificationType[]; total: number }>("/notification");
  const { data, mutate, setSize, size } = useSWRInfinite<{ result: notificationType[]; total: number }>(
    (index) => `/notification?sort=createdAt&order=DESC&unseen=true&page=${index + 1}`
  );
  const notifications = data ? data.map((d) => d.result).flat() : [];
  const canLoadMore = data && data.length > 0 ? notifications.length !== data[0].total : false;

  const handleSeen = async (id: string) => {
    try {
      await toggleSeenNotification(id);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">Notifications</Typography>
      <Box mt={2}>
        <Paper>
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              style={{
                paddingLeft: "1.5em",
                paddingTop: "1em",
                paddingRight: 4,
              }}
            >
              <TextField name="search" label="Search..." />
              <IconButton>
                <FilterListRounded />
              </IconButton>
            </Box>
            <List>
              {notifications?.map((notification) => (
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
                    <IconButton
                      onClick={() => handleSeen(notification.id)}
                      edge="end"
                      aria-label="delete"
                      style={{ marginRight: "2em" }}
                    >
                      <CheckRounded />
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
            <Button disabled={!canLoadMore} fullWidth variant="outlined" onClick={() => setSize(size + 1)}>
              See More
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
