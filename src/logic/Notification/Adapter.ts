import { notificationType } from "api/notification";
import SocketAgent, { listenerType } from "../Socket";
import { store } from "store";
import { notifyUser } from "./util";

export default class NotificationAdapter {
  private socket = SocketAgent.getInstance();

  constructor() {
    this.onNotification(({ title, body }: notificationType) => {
      if (!store.getState()?.session?.firebaseToken) {
        notifyUser({ title, body });
      }
    });
  }

  onNotification(listener: listenerType) {
    this.socket.subscribe("notification", listener);
  }
}
