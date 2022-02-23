import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { selectFirebaseToken, selectSessionToken } from "../../features/Session/sessionsSlice";

import SocketAgent from ".";
import Notification from "../Notification/Adapter";

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

  useEffect(() => {
    if (employeeToken && firebaseToken) {
      SocketAgent.getInstance().sendAuth({ employeeToken, firebaseToken });
    }
  }, [employeeToken, firebaseToken]);

  const notification = useMemo(() => new Notification(), []);

  return { notification };
};

export const useSocket = () => {
  return useContext(SocketContext);
};
