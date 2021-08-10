import React, {
    useState,
    useEffect,
    useMemo,
    createContext,
    ReactNode,
    useCallback,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";
import ChatAdapter, { messageType, userType } from "./ChatAdapter";

interface chatContextType {
    ChatSocket: ChatAdapter;
    users: userType[];
    messages: messageType[];
    setUsers: Dispatch<SetStateAction<userType[]>>;
    setMessages: Dispatch<SetStateAction<messageType[]>>;
    setSelectedUser: Dispatch<SetStateAction<userType | undefined>>;
    selectedUser: userType | undefined;
    sendPrivateMessage: (content: string) => void;
}
export const ChatContext = createContext<chatContextType | null>(null);

export const ChatSocketProvider = ({ children }: { children: ReactNode }) => {
    const state = useChatProvider();

    return <ChatContext.Provider value={state}>{children}</ChatContext.Provider>;
};

export const useChatProvider = () => {
    const [users, setUsers] = useState<userType[]>([]);
    const [messages, setMessages] = useState<messageType[]>([]);
    const [selectedUser, setSelectedUser] = useState<userType>();

    const handleUsers = useCallback((usersList: any[]) => {
        setUsers(usersList);
    }, []);

    const handleUserConnected = useCallback((user: any) => {
        setUsers((prev) => {
            let res = prev.slice();
            res.forEach((existingUser, i) => {
                if (existingUser.userID === user.userID) {
                    res[i].status = "online";
                    return;
                }

                res[i].hasNewMessages = false;
            });

            return res;
        });
    }, []);

    const handleUserDisconnected = useCallback((id: string) => {
        setUsers((prev) => {
            let res = prev.slice();
            res.forEach((user, i) => {
                if (ChatSocket.getSocketId() === id) {
                    res[i].status = "offline";
                }
            });

            return res;
        });
    }, []);

    const handlePrivateChat = ({ content, from, to }: { content: string; from: string; to: string }) => {
        setMessages((prev) => [...prev, { content, from, to } as any]);

        setUsers((prev) => {
            let fromSelf: boolean;
            const res = prev.slice();
            res.forEach((user, i) => {
                fromSelf = (ChatSocket.getSocketAuth() as any).username === from;
                if (user.username === (fromSelf ? to : from)) {
                    res[i].messages.push({
                        content,
                        from,
                        to,
                        fromSelf,
                    } as any);
                    if (user.username !== selectedUser?.username) {
                        res[i].hasNewMessages = true;
                    }
                }
            });

            return res;
        });
    };

    const ChatSocket = useMemo<ChatAdapter>(() => {
        const socket = new ChatAdapter(handleUsers, handleUserConnected, handleUserDisconnected, handlePrivateChat);

        return socket;
    }, []);

    const sendPrivateMessage = (content: string) => {
        if (selectedUser) {
            ChatSocket.sendPrivateMessage(content, selectedUser.username);
            const from = (ChatSocket.getSocketAuth() as any).username;
            setMessages((prev) => [...prev, { content, to: selectedUser.username, from } as any]);
        }
    };

    useEffect(() => {
        if (ChatSocket) {
            ChatSocket.connect();
        }

        return () => ChatSocket && ChatSocket.disconnect();
    }, [ChatSocket]);

    return { ChatSocket, users, setUsers, messages, setMessages, selectedUser, setSelectedUser, sendPrivateMessage };
};

export const useChat = () => useContext(ChatContext);
