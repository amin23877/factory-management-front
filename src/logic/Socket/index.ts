import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

import { SocketUrl } from "../../api/config";

export type listenerType = (args: any) => any;

class SocketAgent {
  private static instance: SocketAgent;
  private static socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

  private constructor() {
    SocketAgent.socket = io(SocketUrl, { transports: ["websocket"] });

    this.subscribe("connect", () => {
      console.log("SocketAgent connected");
    });

    this.subscribe("disconnect", () => {
      console.log("SocketAgent disconnected");
    });
  }

  public static getInstance(): SocketAgent {
    if (!SocketAgent.instance) {
      SocketAgent.instance = new SocketAgent();
    }

    return SocketAgent.instance;
  }

  public send(event: string, data: any) {
    SocketAgent.socket?.emit(event, data);
  }

  public sendAuth(tokens: { employeeToken: string; firebaseToken: string }) {
    console.log({ tokens });

    SocketAgent.socket?.emit("auth", tokens);
  }

  public subscribe(event: string, listener: listenerType) {
    SocketAgent.socket?.on(event, listener);
  }

  public unsubscribe(event: string) {
    SocketAgent.socket?.off(event);
  }

  public subscribeOnce(event: string, listener: listenerType) {
    SocketAgent.socket?.once(event, listener);
  }

  public getEventListeners(event: string) {
    return SocketAgent.socket?.listeners(event);
  }

  public disconnect() {
    SocketAgent.socket?.disconnect();
  }
}

export default SocketAgent;
