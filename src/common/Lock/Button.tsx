import React from "react";
import { LockOpenRounded, LockOutlined } from "@material-ui/icons";

import useLock from "./hooks";

export default function LockButton() {
  const { lock, setLock } = useLock();

  return (
    <>
      {lock ? (
        <LockOutlined onClick={() => setLock((p) => !p)} />
      ) : (
        <LockOpenRounded onClick={() => setLock((p) => !p)} />
      )}
    </>
  );
}
