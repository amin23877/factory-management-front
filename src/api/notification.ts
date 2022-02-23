import { get } from ".";

export interface notificationType {
  title: string;
  body: string;
}

export const sendNotificationTest = () => {
  return get("/firebasetest");
};

export const getNotifications = () => {
  return get("/notification");
};
