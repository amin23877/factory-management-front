import React from "react";
import Button from "app/Button";
import Confirm from "common/Confirm";

import { delete_ } from "api";
import Toast from "app/Toast";

export default function DeleteButton({
  confirm,
  url,
  onDone,
}: {
  url: string;
  confirm?: boolean;
  onDone?: () => void;
}) {
  const deleteEntity = async () => {
    try {
      await delete_(url);
    } catch (error) {
      Toast("Delete failed", "error");
    }
  };

  const handleDelete = async () => {
    if (confirm) {
      Confirm({
        text: "Are you sure?",
        async onConfirm() {
          try {
            await deleteEntity();
            onDone && onDone();
          } catch (error) {
            console.log(error);
          }
        },
      });
    } else {
      try {
        await deleteEntity();
        onDone && onDone();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Button kind="delete" onClick={handleDelete}>
      Delete
    </Button>
  );
}
