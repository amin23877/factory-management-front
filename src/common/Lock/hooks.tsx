import { useContext } from "react";

import { context } from "./Context";

export default function useLock() {
  const lock = useContext(context);

  return lock;
}
