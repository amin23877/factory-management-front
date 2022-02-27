import { get } from ".";

export interface notificationType {
  id: string;
  createDoc: boolean;
  data: any;
  body: string;
  title: string;
  type: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
}

export const sendNotificationTest = () => {
  return get("/firebasetest");
};

export const getNotifications = () => {
  return get("/notification");
};
