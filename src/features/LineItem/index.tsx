import React from "react";
import Box from "@material-ui/core/Box";
import { mutate } from "swr";

import Dialog from "../../app/Dialog";
import Form from "./Form";

import { ILineItem, records } from "../../api/lineItem";

export default function LineItemModal({
  open,
  onClose,
  record,
  recordId,
  selectedLine,
  readOnly,
  mutateField,
}: {
  selectedLine?: ILineItem;
  open: boolean;
  onClose: () => void;
  record: records;
  recordId: string;
  mutateField: "QuoteId" | "SOId" | "POId" | "PurchasePOId" | "PurchaseSOId";
  readOnly?: boolean;
}) {
  return (
    <Dialog open={open} onClose={onClose} title={`${selectedLine ? "Edit" : "Add new"} Line Item`}>
      <Box p={2}>
        <Form
          initialValues={selectedLine}
          recordId={recordId}
          record={record}
          readOnly={readOnly}
          onDone={() => {
            mutate(`/lineitem?${mutateField}=${recordId}`);
            onClose();
          }}
        />
      </Box>
    </Dialog>
  );
}
