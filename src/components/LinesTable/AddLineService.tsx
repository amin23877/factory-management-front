import { AddLineServiceForm } from "features/Purchase/PO/Forms";
import React from "react";

import Dialog from "app/Dialog";
import { IItem } from "api/items";
import { ILineItem } from "api/lineItem";

export function AddLineService({
  setAddLineService,
  addLineService,
  handleSubmit,
}: {
  addLineService: boolean;
  setAddLineService: (a: boolean) => void;
  handleSubmit: (a: ILineItem, i: IItem) => void;
}) {
  return (
    <Dialog
      onClose={() => {
        setAddLineService(false);
      }}
      open={Boolean(addLineService)}
      title="Add Service"
      maxWidth="xs"
      fullWidth
    >
      <AddLineServiceForm
        onClose={() => setAddLineService(false)}
        handleAddService={(d: ILineItem, i: IItem) => {
          handleSubmit(d, i);
        }}
      />
    </Dialog>
  );
}
