import SocketAgent, { listenerType } from "../Socket";

export default class NotificationAdapter {
  private socket = SocketAgent.getInstance();

  onNotification(listener: listenerType) {
    this.socket.subscribe("notification", listener);
  }
}
