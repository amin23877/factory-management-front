import SocketAgent, { listenerType } from "../Socket";

export default class NotificationAdapter {
  private socket = SocketAgent.getInstance();

  constructor() {
    this.onNotification((data) => {
      console.log({ onNotification: data });
    });
  }

  onNotification(listener: listenerType) {
    this.socket.subscribe("notification", listener);
  }
}
