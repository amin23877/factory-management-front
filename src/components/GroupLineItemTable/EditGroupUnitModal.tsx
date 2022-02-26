import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { CacheFieldSelect } from "app/Inputs";

export default function EditGroupUnitModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (unitId?: string) => void;
}) {
  const [unitId, setUnitId] = useState<string>();

  // TODO: needs a unit field select, when api is ready
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Unit</DialogTitle>
      <DialogContent>
        <DialogContentText>Choose an unit that this group in related to.</DialogContentText>
        {/* <CacheFieldSelect
          url="/unit"
          itemTitleField="no"
          itemValueField="id"
          autoFocus
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSubmit("")} color="primary">
          Remove
        </Button>
        <Button disabled={!unitId} onClick={() => unitId && onSubmit(unitId)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
