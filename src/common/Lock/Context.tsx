import React, { createContext, ReactNode, useState } from "react";

export const context = createContext({ lock: true, setLock: (v: boolean | ((v: boolean) => boolean)) => {} });

export default function LockProvider({ children }: { children: ReactNode }) {
  const [lock, setLock] = useState(true);

  return <context.Provider value={{ lock, setLock }}>{children}</context.Provider>;
}
