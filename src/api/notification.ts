import { get } from ".";

export interface notificationType {
  createDoc: boolean;
  data: any;
  body: string;
  title: string;
  type: string;
}

export const sendNotificationTest = () => {
  return get("/firebasetest");
};

export const getNotifications = () => {
  return get("/notification");
};
