import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Dialog from "app/Dialog";

export default function AddModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog title="Add Job Record" open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box style={{ margin: "0.5em 2em" }}>
        <Button>Next</Button>
      </Box>
    </Dialog>
  );
}
