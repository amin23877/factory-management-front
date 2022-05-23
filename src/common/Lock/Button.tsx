import React from "react";
import { LockOpenRounded, LockRounded } from "@material-ui/icons";

import Button from "app/Button";
import useLock from "./hooks";

export default function LockButton() {
  const { lock, setLock } = useLock();

  return (
    <Button onClick={() => setLock((p) => !p)} variant="contained" color={lock ? "primary" : "secondary"}>
      {lock ? <LockRounded /> : <LockOpenRounded />}
    </Button>
  );
}
