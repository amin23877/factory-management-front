import React from "react";

import { delete_ } from "api";
import Toast from "app/Toast";
import Confirm from "features/Modals/Confirm";

export default function DeleteConfirm({
  url,
  open,
  onClose,
  onDone,
}: {
  url: string;
  open: boolean;
  onClose: () => void;
  onDone?: () => void;
}) {
  const handleDelete = async () => {
    try {
      await delete_(url);

      onDone && onDone();
      onClose();
    } catch (error) {
      Toast("Delete failed", "error");
    }
  };
  return <Confirm open={open} onClose={onClose} onConfirm={handleDelete} />;
}
