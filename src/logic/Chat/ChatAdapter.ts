import { io } from "socket.io-client";
import { getToken } from "../../api";

export type messageType = {
    _id: string;
    hasFile: boolean;
    fileAddress?: string | null;
    content: string;
    from: string;
    to: string;
    fromSelf?: boolean;
};

export type userType = {
    messages: messageType[];
    sockets: string[];
    status: "online" | "offline";
    userID: string;
    username: string;
    hasNewMessages?: boolean;
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
        onPrivateMessage: (msg: { content: string; from: string; to: string }) => void
    ) {
        if (!this.token) {
            return;
        }
        this.socket = io(this.socketURL, { autoConnect: false, transports: ["websocket"] });
        this.socket.auth = { token: this.token };
        this.socket.onAny((event, args) => {
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

    public sendPrivateMessage(content: string, to: string, file?: string) {
        if (this.socket) {
            this.socket.emit("private message", { content, to, file: file ? file : null });
        }
    }

    public disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
