import React from "react";
import { Box } from "@material-ui/core";

import Dialog from "app/Dialog";
import Form from "./Form";

export default function AddRep({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone: () => void }) {
  return (
    <Dialog title="Add Rep" open={open} onClose={onClose}>
      <Box m={1}>
        <Form
          onDone={() => {
            onDone();
            onClose();
          }}
        />
      </Box>
    </Dialog>
  );
}
