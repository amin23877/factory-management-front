import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { selectFirebaseToken, selectSessionToken } from "../../features/Session/sessionsSlice";

import SocketAgent from ".";
import Notification from "../Notification/Adapter";
import { notifyUser } from "logic/Notification/util";
import { notificationType } from "api/notification";

type contextType = {
  notification: Notification | null;
};

const SocketContext = createContext<contextType>({ notification: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useSocketProvider();

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

const useSocketProvider = () => {
  const employeeToken = useSelector(selectSessionToken);
  const firebaseToken = useSelector(selectFirebaseToken);

  const notification = useMemo(() => new Notification(), []);

  useEffect(() => {
    if (employeeToken) {
      SocketAgent.getInstance().sendAuth({ employeeToken, firebaseToken: firebaseToken || "no-token" });
      if (!firebaseToken) {
        notification.onNotification(({ title, body }: notificationType) => {
          notifyUser({ title, body });
        });
      }
    }
  }, [employeeToken, firebaseToken, notification]);

  return { notification };
};

export const useSocket = () => {
  return useContext(SocketContext);
};
