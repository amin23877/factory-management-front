import React from "react";
import { Box } from "@material-ui/core";

import MyForm from "./Form";
import MyDialog from "app/Dialog";

export default function Modal({ onClose, open }: { open: boolean; onClose: () => void }) {
  return (
    <MyDialog open={open} onClose={onClose} title="Levels" maxWidth="md" fullWidth>
      <Box height={400}>
        <MyForm />
      </Box>
    </MyDialog>
  );
}
