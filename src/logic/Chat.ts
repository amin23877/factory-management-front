import { io } from "socket.io-client";
import { getToken } from "../api";

export type messageType = {
    content: string;
    from: any;
    to: any;
};

export type userType = {
    messages: messageType[];
    sockets: string[];
    status: "online" | "offline";
    userID: string;
    username: string;
};

// Adapter for chat socket
export default class ChatAdapter {
    private socketURL: string = "http://digitalphocus.ir";
    private socket;
    private token = getToken();

    constructor(
        onUsers: (users: userType[]) => void,
        onUserConnected: (user: userType) => void,
        onUserDisconnected: (id: string) => void,
        onPrivateMessage: (msg: { content: string; from: any; to: any }) => void
    ) {
        if (!this.token) {
            return;
        }
        this.socket = io(this.socketURL, { autoConnect: false, transports: ["websocket"] });
        this.socket.auth = { token: this.token };
        this.socket.onAny((event, ...args) => {
            console.log("ChatAdapter", event, args);
        });

        this.socket.on("socket connected", ({ userID, username }) => {
            if (this.socket) {
                this.socket.auth = { token: this.token, userID: userID, username: username };
            }
        });

        this.socket.on("connect_error", (err) => {
            console.error("ChatAdapter", err);
        });

        this.socket.on("users", onUsers);
        this.socket.on("user connected", onUserConnected);
        this.socket.on("user disconnected", onUserDisconnected);
        this.socket.on("private message", onPrivateMessage);
    }

    // Events
    public getSocketId() {
        return this.socket ? this.socket.id : null;
    }

    public getSocketAuth() {
        return this.socket ? this.socket.auth : null;
    }

    public connect() {
        if (this.socket) {
            this.socket.connect();
            this.socket.emit("auth");
        }
    }

    public sendPrivateMessage(content: string, to: string) {
        if (this.socket) {
            this.socket.emit("private message", { content, to });
        }
    }

    public disconnect() {
        if (this.socket) {
            this.socket.off("connect_error");
            this.socket.off("connect");
            this.socket.off("disconnect");
            this.socket.off("users");
            this.socket.off("user connected");
            this.socket.off("user disconnected");
            this.socket.off("private message");

            this.socket.disconnect();
        }
    }
}
